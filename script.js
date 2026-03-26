const photoQuestions = [
    {
        q: "Bayrak neyi temsil eder?",
        a: "Bayrak bir ulusun bağımsızlığını ve egemenliğini temsil eder."
    },
    {
        q: "Türk bayrağı nerelere asılır?",
        a: "- Kamu kurum ve kuruluşlarına\n- Yurt dışı temsilciliklerine\n- Gerçek ve tüzel kişilerin deniz vasıtalarına\n- Yurt içi ve yurt dışı yetkililerin araçlarına"
    },
    {
        q: "Türk bayrağı hangi durumlarda yarıya çekilir? (İndirilir)",
        a: "- Yas alameti olarak 10 Kasım'da yarıya çekilir.\n- Milli yas gibi hallerde çekilir."
    },
    {
        q: "Türk bayrağı nerelere örtülür?",
        a: "Devlet başkanlığı yapmış kişilerin, şehitlerin, tüzükte belirtilen asker ve sivillerin tabutlarına örtülür."
    },
    {
        q: "Randevu oluştururken nelere dikkat edilmelidir?",
        a: "1- Saat ve tarih net olarak belirtilmelidir.\n2- Randevular arasında yeterli zaman aralığı bırakılmalıdır.\n3- Günün geç saatlerine randevu konulmamalıdır.\n4- Yazılı gelen randevular teyit edilmelidir.\n5- Alınan veya verilen randevular en az 24 saat önceden iptal edilmelidir.\n6- Kişisel bilgiler yazılmalıdır."
    },
    {
        q: "Kartvizitte hangi bilgiler bulunur?",
        a: "Sahibinin adı, soyadı, unvanı, bağlı olduğu kurum ve iletişim bilgileri."
    },
    {
        q: "Erkeklerde resmi kıyafet protokolü nasıldır?",
        a: "- Siyah veya koyu lacivert takım elbise\n- Takım içerisine beyaz gömlek\n- Bağcıklı siyah deri ayakkabı ve siyah çorap"
    },
    {
        q: "Kadınlarda resmi kıyafet protokolü nasıldır?",
        a: "- Gündüz yapılan resmi davetlerde koyu renk tayyör\n- Gece yapılan davetlerde tuvalet\n- Gündüz koyu renk takım, kumaş pantolon, ceket giymek yarı resmi kıyafet olmaktadır."
    },
    {
        q: "Tören çeşitlerini sıralayınız.",
        a: "- Devlet Töreni: Cumhurbaşkanının katıldığı tören\n- Resmi Tören: Vali ve kaymakamların katıldığı\n- Adli Tören: Yargı organlarının temsilcilerinin katıldığı\n- Akademik Tören: Üniversitelerde düzenlenen tören\n- Kurumsal Tören: Bakanlıkların ve kurumların düzenlediği törenler\n- Sosyal Tören: Nikah, düğün gibi etkinliklerin düzenlendiği"
    },
    {
        q: "Sosyal törenlere örnek veriniz.",
        a: "Nikah, düğün, sünnet."
    },
    {
        q: "Resmi törenlerde konuşma sırası ve kullanılan ifade nasıl olmalıdır?",
        a: "Konuşma sırası alttan üste doğrudur. Konuşma sırası alttan üste olur. En üst makamı temsil eden kişi en son konuşma yapar. Hitap edilirken konuşmalarda ben değil biz ifadesi kullanılır."
    },
    {
        q: "Nezaket kuralları ilkeleri nelerdir?",
        a: "- İnziva\n- Uyum\n- Cömertlik\n- İncelik\n- Empati\n- Sadakat\n- Takdir"
    },
    {
        q: "Sosyal hayatta selamlama kuralları nasıldır?",
        a: "- Erkekler kadınları\n- Araçta olanlar yürüyenleri\n- Küçükler büyükleri\n- Gençler yaşlılara göre önceliklidir"
    },
    {
        q: "Resmi davet ve ziyafetlerde ne tür masa düzeni kullanılır?",
        a: "U masa, yuvarlak masa ve oval masa, uzun dikdörtgen masa."
    },
    {
        q: "Davet yapılırken mutlaka ne dikkate alınmalıdır?",
        a: "Resmi davet mutlaka davetiye ile yapılmalıdır."
    },
    {
        q: "Uzun çalışma sürelerinin getirdiği fiziksel rahatsızlıklar nelerdir?",
        a: "Baş, boyun, sırt ağrısı; göz rahatsızlığı; alerji, tansiyon vb. gibi şikayetlere sebep olur."
    },
    {
        q: "Ergonomik açıdan büroların etkin kullanımını sağlamak için nelere dikkat edilmelidir?",
        a: "Çalışma ortamındaki renk seçimi, oturma düzeni, mobilyalar, aydınlatma, havalandırma sistemi."
    },
    {
        q: "Meslek hastalığı nedir?",
        a: "Çalışma şartları yüzünden uğradığı geçici veya sürekli hastalık, bedensel veya ruhsal kalıcı rahatsızlıkları ifade eder."
    },
    {
        q: "Ergonominin amaçları nelerdir?",
        a: "- İş gücü kayıplarını önlemek\n- Verimlilik ve kaliteyi yükseltmek\n- Yaralanmaları ve iş stresini azaltmak\n- İş sağlığı ve iş güvenliğini sağlamak\n- Çalışan performansını artırmak\n- İş kazalarını ve mesleki riskleri azaltmak"
    },
    {
        q: "Ergonominin faydalandığı bilim dalları nelerdir?",
        a: "Beşeri ve sosyal bilimler, yönetim bilimleri, mühendislik bilimleri, sağlık bilimleri."
    },
    {
        q: "Ergonominin faydaları nelerdir?",
        a: "Azalanlar: İş süresi, yorgunluk, işe devamsızlık, araç gereç israfı.\nArtanlar: Kar ve kalite, motivasyon, iş doyumu, üretkenlik."
    },
    {
        q: "Çalışma alanlarında sağlıkla ilgili fiziksel beklentiler nelerdir?",
        a: "- Temizliğin yapılması\n- Çöplerin atılması\n- Büronun mikrop ve zararlılardan korunması"
    },
    {
        q: "Çalışma alanlarında güvenlikle ilgili fiziksel beklentiler?",
        a: "Yangına, doğal afetlere, hırsızlığa ve çalışma anındaki kazalara karşı korunması."
    },
    {
        q: "Doğal ve yapay aydınlatmaya örnekler veriniz.",
        a: "Doğal aydınlatmalar: Güneş.\nYapay aydınlatmalar: Beyaz ışık veren floresan, led lambalar, cıvalı ampuller."
    },
    {
        q: "Gürültüyü kaynağında önlemeye yönelik faaliyetler nelerdir?",
        a: "- Büro ve iş yerlerinde masa ve sandalyelerin altına keçe sünger gibi malzemeler geçirilmesi.\n- Telefon zillerinin kısılması veya ışıklı uyarı sistemi.\n- Makine bakımlarının belirli aralıklarla yapılması.\n- Gürültülü makinelerde susturucu kullanılması.\n- Gürültülü makinelerin bodrum ya da zemin katlara yerleştirilmesi."
    },
    {
        q: "Aşırı gürültünün olumsuz etkileri nelerdir?",
        a: "Azalanlar: Duyma, iş konforu, performans, konsantrasyon.\nArtanlar: Huzursuzluk, kan basıncı, sinirlilik, stres."
    },
    {
        q: "İklimlendirme nedir?",
        a: "Havanın temizlenmesi, soğutulması, ısıtılması, nemlendirilmesi veya kurutulmasıyla mekan içerisinde istenen şartların oluşturulması faaliyetidir."
    }
];

const motivationMessages = [
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
    "Aferin lan sana essek."
];
// Soruları karıştır
photoQuestions.sort(() => Math.random() - 0.5);

// Uygulama Durumu
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;

// Soruları karıştır

// HTML Elementlerini Seç
const questionText = document.getElementById("question-text");
const answerText = document.getElementById("answer-text");
const answerSection = document.getElementById("answer-section");
const showAnswerBtn = document.getElementById("show-answer-btn");
const voteBtns = document.getElementById("vote-btns");
const progressText = document.getElementById("progress-text");
const cardContainer = document.getElementById("card-container");
const resultScreen = document.getElementById("result-screen");
const finalCorrect = document.getElementById("final-correct");
const finalWrong = document.getElementById("final-wrong");
const finalMessage = document.getElementById("final-message");
const progressFill = document.getElementById("progress-fill");
const knownCount = document.getElementById("known-count");
const totalQuestionsEl = document.getElementById("total-questions");
const motivationNote = document.getElementById("motivation-note");

// Toplam soru sayısını ayarla
totalQuestionsEl.textContent = photoQuestions.length;

function updateProgress() {
    const percentage = (correctCount / photoQuestions.length) * 100;
    progressFill.style.width = `${percentage}%`;
    knownCount.textContent = correctCount;
}

function loadQuestion() {
    if (currentIndex >= photoQuestions.length) {
        showResults();
        return;
    }

    const currentQ = photoQuestions[currentIndex];
    
    // Rastgele motivasyon mesajı
    const randomMessage = motivationMessages[Math.floor(Math.random() * motivationMessages.length)];
    motivationNote.textContent = randomMessage;
    
    // UI Sıfırla
    questionText.textContent = currentQ.q;
    answerText.textContent = currentQ.a;
    answerSection.classList.add("hidden");
    showAnswerBtn.classList.remove("hidden");
    voteBtns.classList.add("hidden");
    
    progressText.textContent = `Soru ${currentIndex + 1} / ${photoQuestions.length}`;
}

function showAnswer() {
    answerSection.classList.remove("hidden");
    showAnswerBtn.classList.add("hidden");
    voteBtns.classList.remove("hidden");
}

function handleVote(isCorrect) {
    if (isCorrect) {
        correctCount++;
    } else {
        wrongCount++;
    }
    
    updateProgress();
    currentIndex++;
    loadQuestion();
}

function showResults() {
    cardContainer.classList.add("hidden");
    document.querySelector(".controls").classList.add("hidden");
    resultScreen.classList.remove("hidden");
    progressText.classList.add("hidden");

    finalCorrect.textContent = correctCount;
    finalWrong.textContent = wrongCount;

    const percentage = (correctCount / photoQuestions.length) * 100;
    
    if (percentage > 80) {
        finalMessage.textContent = "Süpersin yavrumm";
    } else if (percentage > 50) {
        finalMessage.textContent = "Gayet iyi, ama biraz daha tekrar yapabilirsin. 👍";
    } else {
        finalMessage.textContent = "cok olmamıs sanki hadi bidaaa";
    }
}

// Event Listeners
showAnswerBtn.addEventListener("click", showAnswer);
document.getElementById("correct-btn").addEventListener("click", () => handleVote(true));
document.getElementById("wrong-btn").addEventListener("click", () => handleVote(false));

// Başlat
loadQuestion();