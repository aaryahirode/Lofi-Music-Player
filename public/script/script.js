const like=document.querySelector(".like");
const likedSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`;
const unlikedSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>`;

const play=document.querySelector(".play");
const playSVG = `<svg id="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>`
const pauseSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"/></svg>`

const audio = document.getElementById("audioPlayer");

const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

// like - unlike toggle
like.addEventListener("click", () => {
    if (like.classList.contains("liking")) {
        like.innerHTML = unlikedSVG;
        like.classList.remove("liking");
    } else {
        like.innerHTML = likedSVG;
        like.classList.add("liking");
    }
});

// play -pause toggle
play.addEventListener("click", () => {
    if (!audio.src || audio.src === window.location.href) {
        alert("No audio file selected!");
        return;
    }

    if (audio.paused || audio.currentTime === 0) {
        audio.play().then(() => {
            play.innerHTML = pauseSVG;
            play.classList.add("playing");
        }).catch(error => console.error("Playback failed:", error));
    } else {
        audio.pause();
        play.innerHTML = playSVG;
        play.classList.remove("playing");
    }
});

// lyrics button - toggle
document.addEventListener("DOMContentLoaded", function () {
    const lyricsButton = document.querySelector(".lyrics");
    const closeButton = document.getElementById("closeLyrics");
    const lyricsBox = document.getElementById("lyricsBox");

    lyricsButton.addEventListener("click", function () {
        lyricsBox.style.display = "block";
    });

    closeButton.addEventListener("click", function () {
        lyricsBox.style.display = "none";
    });
});

// change theme
document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const body = document.body;
    const box = document.querySelector(".box");

    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        box.classList.add("dark-box");
        themeToggleBtn.innerText = "☀ Change Theme";
    }

    themeToggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        box.classList.toggle("dark-box");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerText = "☀ Change Theme";
        } else {
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerText = "🌙 Change Theme";
        }
    });
});

// volume button up - down
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioPlayer");
    const volumeUp = document.getElementById("volumeUp");
    const volumeDown = document.getElementById("volumeDown");

    audio.volume = 0.5;

    const updateVolumeDisplay = () => {
        console.log(`🔊 Volume: ${Math.round(audio.volume * 100)}%`);
    };

    volumeUp.addEventListener("click", () => {
        if (audio.volume < 1.0) {
            audio.volume = Math.min(1.0, audio.volume + 0.1);
            updateVolumeDisplay();
        }
    });

    volumeDown.addEventListener("click", () => {
        if (audio.volume > 0.0) {
            audio.volume = Math.max(0.0, audio.volume - 0.1);
            updateVolumeDisplay();
        }
    });
});

// audio duration
audio.addEventListener("loadedmetadata", () => {
    console.log("Audio Duration:", audio.duration);
    if (!isNaN(audio.duration)) {
        progressBar.max = audio.duration;
        durationDisplay.textContent = formatTime(audio.duration);
    }
});

// update slider as audio plays
audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// allow user to seek
progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
});

// reset play button when audio ends
audio.addEventListener("ended", () => {
    play.innerHTML = playSVG;
    play.classList.remove("playing");
});

// format time
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}