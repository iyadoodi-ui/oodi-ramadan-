// --- THE RAMADAN JOKE BANK ---
const ramadanJokes = {
    en: [
        "Suhur: Eats like a king. 10 AM: Stomach starts a heavy metal concert.",
        "That moment you realize 'Not even water?' is the most asked question in history.",
        "Walking into the kitchen during the day just to smell the air like a gourmet chef.",
        "The 'Ramadan Nap' is the closest thing to time travel. Sleep at 2 PM, wake up at Maghrib.",
        "Your nose develops a superpower to smell a samosa from 5 miles away.",
        "Chewing a pen and panicking thinking you broke your fast.",
        "Finishing a gallon of water 2 minutes before Fajr like a fire hydrant.",
        "Iftar starts at 6:00. At 5:59, you are staring at the date like it's a long-lost lover.",
        "My stomach at 4 PM: 'I have never been fed in my entire life.'",
        "The 3 stages of Iftar: 1. Water. 2. Dates. 3. Food Coma.",
        "Looking at food commercials: 'I could eat that entire table.'",
        "Waking up for Suhur feels like a secret midnight mission.",
        "TV is 90% food commercials and 10% everything else.",
        "The sound of the Adhan is the most beautiful music ever composed.",
        "Drinking coffee at Suhur so your brain doesn't quit at noon.",
        "Panic when you hear 'Allah-hu-Akbar' with a mouthful of bread.",
        "The hero of the month: The person who brings the Samosas.",
        "I’m not hungry, I’m just... highly motivated to eat later.",
        "My brain: 'Drink water.' My stomach: 'There is no room, only Samosas.'",
        "Running to the kitchen when you hear a plate, only to find the cat.",
        "From 'I'm dying of hunger' to 'I can't move' in 5 minutes.",
        "Suhur: 5% eating, 95% trying to keep your eyes open.",
        "The first sip of water feels like your soul returning to your body.",
        "Trying to explain why you can't eat a 'small' snack to your boss.",
        "Counting down the seconds to Iftar like a NASA launch.",
        "When you see someone eating during the day and you feel betrayed.",
        "The 'Iftar glow' is just grease from the fried food, but we love it.",
        "Ramadan: The only time it's socially acceptable to eat at 3 AM.",
        "Your stomach growls so loud people think it's an earthquake.",
        "Checking the clock every 5 minutes as if that makes time faster."
        // Add more jokes here following the "Joke Text", format!
    ],
    ar: [
        "السحور: تأكل مثل الملوك. الساعة 10 صباحاً: معدتك تعزف ألحان حزينة.",
        "لما أحد يسألك: 'ولا حتى موية؟'.. هذا السؤال يحتاج صبر الصائمين فعلاً.",
        "دخول المطبخ في نهار رمضان فقط لاستنشاق الروائح كأنك شيف عالمي.",
        "نومة العصر في رمضان هي أسرع وسيلة للسفر عبر الزمن للمغرب.",
        "الأنف في رمضان يكتسب قوة خارقة لشم السمبوسة من مسافة 5 كيلومتر.",
        "الرعب لما تنسى وتذوق الأكل وأنت تطبخ.. تحس إنك سويت جريمة.",
        "محاولة شرب لتر موية قبل الفجر بدقيقتين.. تحس إنك خزان متنقل.",
        "الساعة 5:59.. نظرتك للتمرة كأنها قصة حب أسطورية.",
        "معدتي الساعة 4 العصر: 'أنا لم آكل منذ العصر الحجري'.",
        "مراحل الإفطار: 1. ماء. 2. تمر. 3. غيبوبة طعام.",
        "دعايات الأكل في نهار رمضان المفروض تكون ممنوعة دولياً!",
        "الاستيقاظ للسحور كأنه مهمة سرية في منتصف الليل.",
        "في رمضان.. سؤال 'وش الفطور؟' يبدأ من صلاة الفجر.",
        "صوت الأذان في المغرب هو أجمل لحن في العالم بدون منازع.",
        "الرعب الحقيقي هو لما تسمع 'الله أكبر' وأنت لسه تبلع لقمة السحور.",
        "البطل الحقيقي في رمضان هو اللي يلف السمبوسة.",
        "أنا مو جوعان.. أنا بس عندي 'دافع قوي' للأكل في المستقبل.",
        "مخي: 'اشرب موية'.. معدتي: 'ما فيه مكان، السمبوسة سيطرت'.",
        "الركض للمطبخ لما تسمع صوت صحن، وتكتشف إنها القطة.",
        "التحول من 'بموت جوع' لـ 'ما أقدر أتحرك' ياخد 5 دقايق.",
        "قومة السحور: 5% أكل، 95% محاولة لفتح العين.",
        "أول رشفة موية وقت الفطور.. تحس روحك رجعت لجسمك.",
        "البحث عن ريموت التلفزيون قبل الفطور بـ 10 دقائق هو رياضة وطنية.",
        "لما تخلص فطور وتكتشف إنك نسيت تشرب فيمتو.. مأساة!",
        "أصعب قرار في رمضان: هل أنام بعد السحور ولا أواصل للدوام؟"
        // أضف المزيد من النكت هنا بنفس التنسيق!
    ]
};

// --- SYSTEM VARIABLES ---
let currentLang = 'en';
let highScore = localStorage.getItem('ramadanHS') || 0;
document.getElementById('highScore').innerText = highScore;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 350; canvas.height = 450;

let score = 0, lives = 3, speed = 3, gameActive = false, items = [];
let basket = { x: 150, w: 70, h: 12 };

// --- LANGUAGE & JOKE LOGIC ---
function toggleLanguage(lang) {
    currentLang = lang;
    document.body.classList.toggle('rtl', lang === 'ar');
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });
    nextFact();
}

function nextFact() {
    const jokes = ramadanJokes[currentLang];
    const display = document.getElementById('fact-display');
    display.style.opacity = 0;
    setTimeout(() => {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        display.innerText = randomJoke;
        display.style.opacity = 1;
    }, 200);
}

function shareJoke() {
    const joke = document.getElementById('fact-display').innerText;
    const url = `https://wa.me/?text=${encodeURIComponent("😂 " + joke + " - Play here: " + window.location.href)}`;
    window.open(url, '_blank');
}

// --- GAME LOGIC ---
const handleMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    basket.x = (clientX - rect.left) * (canvas.width / rect.width) - basket.w / 2;
    if (basket.x < 0) basket.x = 0;
    if (basket.x > canvas.width - basket.w) basket.x = canvas.width - basket.w;
};

canvas.addEventListener("mousemove", handleMove);
canvas.addEventListener("touchmove", (e) => { e.preventDefault(); handleMove(e); }, { passive: false });

function startGame() {
    score = 0; lives = 3; speed = 3; items = [];
    gameActive = true;
    document.getElementById("overlay").style.display = "none";
    document.getElementById("scoreVal").innerText = score;
    document.getElementById("lives").innerText = "❤️❤️❤️";
    update();
}

function update() {
    if (!gameActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#ffd700";
    ctx.fillRect(basket.x, 420, basket.w, basket.h);

    if (Math.random() < 0.03) {
        items.push({ x: Math.random() * (canvas.width - 20), y: 0, type: Math.random() > 0.15 ? 'date' : 'bomb' });
    }

    items.forEach((item, index) => {
        item.y += speed;
        if (item.type === 'date') {
            ctx.fillStyle = "#5d3a1a";
            ctx.beginPath(); ctx.ellipse(item.x, item.y, 8, 12, 0, 0, Math.PI*2); ctx.fill();
        } else {
            ctx.fillStyle = "#ff4444";
            ctx.fillRect(item.x-8, item.y-8, 16, 16);
        }

        if (item.y > 420 && item.x > basket.x && item.x < basket.x + basket.w) {
            if (item.type === 'date') { 
                score += 10; 
                if(score % 100 === 0) speed += 0.5; 
            } else { 
                lives--; 
            }
            items.splice(index, 1);
            document.getElementById("scoreVal").innerText = score;
            document.getElementById("lives").innerText = lives > 0 ? "❤️".repeat(lives) : "💀";
        } else if (item.y > canvas.height) {
            items.splice(index, 1);
        }
    });

    if (lives <= 0) {
        gameActive = false;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('ramadanHS', highScore);
            document.getElementById('highScore').innerText = highScore;
        }
        document.getElementById("overlay").style.display = "flex";
        document.getElementById("msg-title").innerText = translations[currentLang].gameOver;
        document.getElementById("final-stats").innerText = translations[currentLang].finalScore + score;
    } else {
        requestAnimationFrame(update);
    }
}

// Translations Object (needed for the toggle function)
const translations = {
    en: { gameTitle: "DATE COLLECTOR", scoreLabel: "PTS", livesLabel: "LIVES", ready: "RAMADAN KAREEM", startBtn: "PLAY NOW", nextJoke: "NEXT JOKE 😂", gameOver: "GAME OVER", finalScore: "Final Score: " },
    ar: { gameTitle: "جامع التمر", scoreLabel: "نقطة", livesLabel: "الأرواح", ready: "رمضان كريم", startBtn: "إبدأ اللعب", nextJoke: "نكتة أخرى 😂", gameOver: "انتهت اللعبة", finalScore: "النتيجة: " }
};

toggleLanguage('en');