let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answers = [];

function getKategoriler() {
    const kategoriler = new Set();
    soruBankasi.forEach(soru => {
        kategoriler.add(soru.kategori);
    });
    return Array.from(kategoriler).sort();
}

// Kategorileri yükleme
window.onload = function() {
    const kategoriSelect = document.getElementById('kategori');
    const kategoriler = getKategoriler();
    
    kategoriler.forEach(kategori => {
        const option = document.createElement('option');
        option.value = kategori;
        option.textContent = kategori;
        kategoriSelect.appendChild(option);
    });
}

function startQuiz() {
    const kategori = document.getElementById('kategori').value;
    currentQuestions = kategori === 'Tümü' 
        ? [...soruBankasi]
        : soruBankasi.filter(s => s.kategori === kategori);
    
    // Soruları karıştır
    for (let i = currentQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentQuestions[i], currentQuestions[j]] = [currentQuestions[j], currentQuestions[i]];
    }
    
    currentQuestionIndex = 0;
    score = 0;
    answers = [];
    
    showQuestion();
    showPage('question');
}

function showQuestion() {
    const soru = currentQuestions[currentQuestionIndex];
    document.getElementById('current-question').textContent = soru.soru;
    document.getElementById('question-progress').textContent = `Soru ${currentQuestionIndex + 1} / ${currentQuestions.length}`;
    document.getElementById('current-score').textContent = score;
    document.getElementById('progress-fill').style.width = `${(currentQuestionIndex / currentQuestions.length) * 100}%`;
    document.getElementById('answer-input').value = '';
    document.getElementById('category-title').textContent = soru.kategori;
}

function evaluateAnswer(userAnswer, correctAnswer) {
    const userAnswerClean = userAnswer.toLowerCase().trim().replace(/\s+/g, ' ');
    const correctAnswerClean = correctAnswer.toLowerCase().trim().replace(/\s+/g, ' ');
    
    // Tam eşleşme kontrolü
    const isExactMatch = userAnswerClean === correctAnswerClean;
    
    // Noktalama işaretlerini kaldırarak kontrol
    const userAnswerNoPunct = userAnswerClean.replace(/[.,!?;:]/g, '');
    const correctAnswerNoPunct = correctAnswerClean.replace(/[.,!?;:]/g, '');
    const isPunctuationDifferent = userAnswerNoPunct === correctAnswerNoPunct;
    
    // Doğru cevabı kelimelere ayırıp kontrol
    const correctWords = new Set(correctAnswerNoPunct.split(' '));
    const userWords = new Set(userAnswerNoPunct.split(' '));
    const missingWords = [...correctWords].filter(word => !userWords.has(word));
    const extraWords = [...userWords].filter(word => !correctWords.has(word));
    
    return {
        dogru: isExactMatch || isPunctuationDifferent,
        eksikKelimeler: missingWords,
        fazlaKelimeler: extraWords,
        dogruCevap: correctAnswer
    };
}

function submitAnswer() {
    const soru = currentQuestions[currentQuestionIndex];
    const cevap = document.getElementById('answer-input').value;
    
    const sonuc = evaluateAnswer(cevap, soru.dogruCevap);
    
    if (sonuc.dogru) {
        score++;
    }
    
    const cevapKayit = {
        soru: soru.soru,
        kullaniciCevabi: cevap,
        dogru: sonuc.dogru,
        dogruCevap: sonuc.dogruCevap,
        eksikKelimeler: sonuc.eksikKelimeler,
        fazlaKelimeler: sonuc.fazlaKelimeler
    };
    
    answers.push(cevapKayit);
    
    showFeedback(sonuc, cevap, soru);
}

function showFeedback(sonuc, cevap, soru) {
    const feedbackDiv = document.getElementById('feedback-content');
    const feedbackHTML = `
        <div class="feedback-box ${sonuc.dogru ? 'feedback-correct' : 'feedback-incorrect'}">
            <div class="feedback-title">
                ${sonuc.dogru ? '✓ Doğru Cevap!' : '✗ Yanlış Cevap'}
            </div>
            <div class="answer-comparison">
                <div class="answer-section">
                    <div class="answer-label">Cevabınız:</div>
                    <div class="user-answer">${cevap}</div>
                </div>
                <div class="answer-section">
                    <div class="answer-label">Doğru Cevap:</div>
                    <div class="user-answer">${sonuc.dogruCevap}</div>
                </div>
                ${!sonuc.dogru ? `
                    <div class="feedback-details">
                        ${sonuc.eksikKelimeler.length > 0 ? `
                            <div class="missing-words">
                                <strong>Eksik Kelimeler:</strong>
                                <div class="keyword-list">
                                    ${sonuc.eksikKelimeler.map(k => 
                                        `<span class="keyword keyword-missing">${k}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        ` : ''}
                        ${sonuc.fazlaKelimeler.length > 0 ? `
                            <div class="extra-words">
                                <strong>Fazla Kelimeler:</strong>
                                <div class="keyword-list">
                                    ${sonuc.fazlaKelimeler.map(k => 
                                        `<span class="keyword keyword-extra">${k}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    feedbackDiv.innerHTML = feedbackHTML;
    showPage('feedback');
}

function skipQuestion() {
    const soru = currentQuestions[currentQuestionIndex];
    
    answers.push({
        soru: soru.soru,
        kullaniciCevabi: '(Atlandı)',
        dogru: false,
        bulunanKelimeler: [],
        bulunmayanKelimeler: soru.anahtar_kelimeler
    });
    
    nextQuestion();
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= currentQuestions.length) {
        showResults();
    } else {
        showQuestion();
        showPage('question');
    }
}

function showResults() {
    const totalQuestions = currentQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    document.getElementById('final-score').textContent = score;
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('success-percentage').textContent = percentage;
    
    const reviewHTML = answers.map((answer, index) => `
        <div class="review-item ${answer.dogru ? 'correct' : answer.kullaniciCevabi === '(Atlandı)' ? 'skipped' : 'incorrect'}">
            <div class="review-question">Soru ${index + 1}: ${answer.soru}</div>
            <div class="review-answer">Cevabınız: ${answer.kullaniciCevabi}</div>
            <div class="keyword-list">
                ${answer.bulunanKelimeler.map(k => 
                    `<span class="keyword keyword-found">${k}</span>`
                ).join('')}
                ${answer.bulunmayanKelimeler.map(k => 
                    `<span class="keyword keyword-missing">${k}</span>`
                ).join('')}
            </div>
        </div>
    `).join('');
    
    document.getElementById('answers-review').innerHTML = reviewHTML;
    showPage('results');
}

function showPage(pageId) {
    ['home', 'question', 'feedback', 'results'].forEach(id => {
        document.getElementById(`${id}-page`).style.display = 'none';
    });
    document.getElementById(`${pageId}-page`).style.display = 'block';
}

function restartQuiz() {
    showPage('home');
}