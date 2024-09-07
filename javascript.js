//BMI calculater
const weightValue = document.getElementById("weight-value");
const heightValue = document.getElementById("height-value");
const weightSlider = document.getElementById("weight");
const heightSlider = document.getElementById("height");
const bmiValue = document.getElementById("bmi");
const statusValue = document.getElementById("status");

let weight = 0;
let height = 0;
let bmi = 0;

const calculateBMI = () => {
    weight = Number(weightSlider.value);
    weightValue.innerText = weight;
    height = Number(heightSlider.value);
    heightValue.innerText = height;
    bmi = (weight / (height/100) ** 2).toFixed(1);
    bmiValue.innerText = bmi;

    if (bmi < 18.5) {
        statusValue.innerText = "Underweight";
    }
    else if (bmi > 18.5 && bmi < 24.9) {
        statusValue.innerText = "Normal";
    }
    else if (bmi > 25 && bmi < 29.9) {
        statusValue.innerText = "Overweight";
    }
    else if (bmi > 30) {
        statusValue.innerText = "Obesity";
    }
    else {
        statusValue.innerText = "Please enter correctly"
    }
};

weightSlider.oninput = calculateBMI;
heightSlider.oninput = calculateBMI;

//music player

const music = document.getElementById("music");
const progressBar = document.getElementById("progress-bar");
const repeat = document.getElementById("repeat");
const backward = document.getElementById("backward");
const play = document.getElementById("play");
const forward = document.getElementById("forward");
const shuffle = document.getElementById("shuffle");
const musicName = document.getElementById("music-name");
const musicImg = document.getElementById("music-img");

const musics = [
    ["musics/Anna Sofia Nord - Hymn For August.mp3", "Hymn For August", "https://png.pngtree.com/background/20230412/original/pngtree-color-flow-series-visually-attractive-backdrop-made-of-streams-of-digital-picture-image_2410020.jpg"],
    ["musics/Comptine - Yann Tiersen.mp3", "Sur le fil", "https://png.pngtree.com/thumb_back/fh260/background/20230411/pngtree-color-flow-series-backdrop-composed-of-streams-of-digital-paint-for-photo-image_2395078.jpg"],
    ["musics/Lynn Tredeau - The Passing of Time.mp3", "The Passing of Time", "https://png.pngtree.com/thumb_back/fh260/background/20220320/pngtree-colorful-fractal-clouds-fractal-dream-music-photo-image_5259038.jpg"],
    ["musics/Souvenirs denfance - Richard Clayderman.mp3", "Souvenirs Denfance", "https://img.freepik.com/premium-photo/colorful-splash-art-abstract-background_938473-20677.jpg"]
];

music.addEventListener("timeupdate", () => {
    const percentage = (music.currentTime / music.duration) * 100;
    progressBar.value = percentage;
})

repeat.addEventListener("click", () => {
    music.currentTime = 0;
    music.play();
});

play.addEventListener("click", () => {
    if (music.paused) {
        music.play();
    }
    else {
        music.pause();
    }
});

let musicNum = 0;
function playMusic() {
    music.src = musics[musicNum][0];
    musicName.innerText = musics[musicNum][1];
    musicImg.src = musics[musicNum][2];
    music.play();
};

backward.addEventListener("click", () => {
    musicNum = (musicNum - 1 + musics.length) % musics.length;
    playMusic();
});

forward.addEventListener("click", () => {
    musicNum = (musicNum + 1 + musics.length) % musics.length;
    playMusic();
});

shuffle.addEventListener("click", () => {
    let randomNum;
    do {
        randomNum = Math.floor(Math.random() * 4)
    } while (randomNum === musicNum);
    musicNum = randomNum;
    playMusic();
});

//Timer


let countdownDuration = 5 * 24 * 60 * 60;
const timerDisplay = document.getElementById('timer');

if (localStorage.getItem('countdownEnd')) {
    const countdownEnd = localStorage.getItem('countdownEnd');
    countdownDuration = Math.max(0, Math.floor((countdownEnd - Date.now()) / 1000));
}

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimer() {
    timerDisplay.innerText = formatTime(countdownDuration);

    if (countdownDuration <= 0) {
        clearInterval(timerInterval);
        timerDisplay.innerText = "Time's up!";
        localStorage.removeItem('countdownEnd');
    } else {
        countdownDuration--;
    }
}

const countdownEnd = Date.now() + countdownDuration * 1000;
localStorage.setItem('countdownEnd', countdownEnd);
const timerInterval = setInterval(updateTimer, 1000);

//Form Validation

const password = document.getElementById("password");
const repassword = document.getElementById("repassword");
const submitBtn = document.getElementById("submit-btn");
const form = document.getElementById("login-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?]).{8,}$/;
    if (password.value !== repassword.value) {
        alert("Passwords do not match.");
        repassword.value = "";
        repassword.focus();
    }
    else if (!regex.test(password.value)) {
        alert("Invalid password: Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
    }
    else {
        form.submit();
    }
});