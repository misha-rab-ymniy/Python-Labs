function toFormat(seconds) {
    return `${Math.floor(seconds / 60)}:${seconds % 60}`;
}


function updateTimer(timer, seconds) {
    timer.textContent = toFormat(seconds);
}

let seconds = Number(sessionStorage.getItem("timeStorage") ?? 3600);
let timer = document.querySelector('#timer');

if (seconds < 0) {
    updateTimer(timer, 0);
} else {
    updateTimer(timer, seconds);
}

let intervalId = setInterval(() => {
    if (seconds === 0) {
        alert('Интервал окончен');
        clearInterval(intervalId);
        sessionStorage.setItem("timeStorage", --seconds);
        return;
    } else if (seconds < 0) {
        updateTimer(timer, 0);
        return;
    }
    --seconds;
    sessionStorage.setItem("timeStorage", seconds);
    updateTimer(timer, seconds);
}, 1000);