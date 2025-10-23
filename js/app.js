let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answers = [];

// Küçük, sevgiliye yazılmış rastgele motivasyon notları
const motivasyonNotlari = [
    "Sana her zaman güveniyorum güzelimm",
    "Başarabileceğini biliyorum sadece sınavına odaklan.",
    "Gülüşün her şeyden değerli",
    "Sana inanıyorum tanıdığım en zeki kızsın yavrumm.",
    "Her zaman yanındayımm.",
    "Sen benim her şeyimsin meleğimm.",
    "Bu notların hepsi senin başarına motivasyon olsun.",
    "Soyadı gibi çalışkan kızım benimm",
    "Birlikte aşarız bitanemm korkma.",
    "Sonraki soruda seni bekliyorum hadi.",
    "Çöz artık bücür",
    "Sen yanlış yapmazsın merak etme soru hatalıdır.",
    "Diyafram nefesi alıp tekrar deniyoruz hadi.",
    "hmm??",
    "Her soruya not mu bekliyon hayırdır yani",
    "Sen benim en büyük şansımsın",
    "Okumayı bırak soruları çöz artık",
    "Sonraki notu merak ediyosan çözmek zorundasin",
    "Sınavın çok güzel geçecek merak etme ben sana inanıyorum",
    "Bu gidisle bitmicek haberin olsun askm",
    "Aferin lan sana essek.",
];

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

    // Rastgele bir motivasyon notu seç ve sağ alt köşeye yerleştir
    const note = motivasyonNotlari[Math.floor(Math.random() * motivasyonNotlari.length)];
    let noteDiv = document.getElementById('motivasyon-note');
    if (!noteDiv) {
        noteDiv = document.createElement('div');
        noteDiv.id = 'motivasyon-note';
        document.body.appendChild(noteDiv);
    }
    noteDiv.textContent = note;
}

function evaluateAnswer(userAnswer, correctAnswer) {
    // Normalizasyon: küçük harf, noktalama kaldırma, fazla boşluk temizleme
    const normalize = s => s.toLowerCase().replace(/[.,!?;:\-()\[\]"']/g, '').trim().replace(/\s+/g, ' ');
    const userClean = normalize(userAnswer || '');
    const correctClean = normalize(correctAnswer || '');

    // Doğrudan tam eşleşme ödüllendirilir
    if (userClean === correctClean && userClean.length > 0) {
        return { dogru: true, eksikKelimeler: [], fazlaKelimeler: [], bulunanKelimeler: correctClean.split(' '), bulunmayanKelimeler: [], dogruCevap: correctAnswer };
    }

    // Stop-words (Türkçe yaygın bağlaç/edat vb.) çıkar
    const stopWords = new Set(['ve','ile','in','da','de','bir','için','olarak','gibi','veya','bu','o','ile','ki','hem','ise','çok','az','en']);

    const toWordSet = s => new Set((s.length === 0 ? [] : s.split(' ')).filter(w => w.length > 1 && !stopWords.has(w)));

    const correctWords = toWordSet(correctClean);
    const userWords = toWordSet(userClean);

    // Kesişim ve farklar
    const bulunan = [...correctWords].filter(w => userWords.has(w));
    const bulunmayan = [...correctWords].filter(w => !userWords.has(w));
    const fazla = [...userWords].filter(w => !correctWords.has(w));

    // Doğru sayısını eşik ile değerlendir (ör. %60 veya en az 1 kelime)
    const required = Math.max(1, Math.ceil(correctWords.size * 0.6));
    const dogru = bulunan.length >= required;

    // Gösterimi azaltmak için liste uzunluklarını sınırlayalım
    const LIMIT = 3;
    const limit = arr => arr.slice(0, LIMIT);

    return {
        dogru,
        eksikKelimeler: limit(bulunmayan),
        fazlaKelimeler: limit(fazla),
        bulunanKelimeler: limit(bulunan),
        bulunmayanKelimeler: limit(bulunmayan),
        toplamEksik: bulunmayan.length,
        toplamFazla: fazla.length,
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
        bulunanKelimeler: sonuc.bulunanKelimeler || [],
        bulunmayanKelimeler: sonuc.bulunmayanKelimeler || [],
        toplamEksik: sonuc.toplamEksik || 0,
        toplamFazla: sonuc.toplamFazla || 0,
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
                                ${sonuc.toplamEksik > 0 ? `
                                    <div class="missing-words">
                                        <strong>Eksik Kelimeler (${sonuc.toplamEksik}):</strong>
                                        <div class="keyword-list">
                                            ${sonuc.eksikKelimeler.map(k => `<span class="keyword keyword-missing">${k}</span>`).join('')}
                                            ${sonuc.toplamEksik > sonuc.eksikKelimeler.length ? `<span class="more"> ... ve ${sonuc.toplamEksik - sonuc.eksikKelimeler.length} tane daha</span>` : ''}
                                        </div>
                                    </div>
                                ` : ''}
                                ${sonuc.toplamFazla > 0 ? `
                                    <div class="extra-words">
                                        <strong>Fazla Kelimeler (${sonuc.toplamFazla}):</strong>
                                        <div class="keyword-list">
                                            ${sonuc.fazlaKelimeler.map(k => `<span class="keyword keyword-extra">${k}</span>`).join('')}
                                            ${sonuc.toplamFazla > sonuc.fazlaKelimeler.length ? `<span class="more"> ... ve ${sonuc.toplamFazla - sonuc.fazlaKelimeler.length} tane daha</span>` : ''}
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
    // Boş cevap ile değerlendirme yaparak eksik kelimeleri hesapla
    const sonuc = evaluateAnswer('', soru.dogruCevap);
    answers.push({
        soru: soru.soru,
        kullaniciCevabi: '(Atlandı)',
        dogru: false,
        bulunanKelimeler: [],
        bulunmayanKelimeler: sonuc.bulunmayanKelimeler || []
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
                ${ (answer.bulunanKelimeler || []).map(k => `<span class="keyword keyword-found">${k}</span>` ).join('') }
                ${ (answer.bulunmayanKelimeler || []).map(k => `<span class="keyword keyword-missing">${k}</span>` ).join('') }
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