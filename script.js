let seconds = 0;
let tens = 0;
let mins = 0;
let lapCounter = 1; // Initialize lap counter to 1
let lapTimes = [];
let getSeconds = document.querySelector('.seconds');
let getTens = document.querySelector('.tens');
let getMins = document.querySelector('.mins');
let btnStart = document.querySelector('.btn-start');
let btnStop = document.querySelector('.btn-stop');
let btnReset = document.querySelector('.btn-reset');
let btnLap = document.querySelector('.btn-lap');
let lapList = document.querySelector('.lap-list');
let interval;

btnStart.addEventListener('click', () => {
    clearInterval(interval);
    interval = setInterval(startTimer, 10);
});

btnStop.addEventListener('click', () => {
    clearInterval(interval);
});

btnReset.addEventListener('click', () => {
    clearInterval(interval);
    tens = 0;
    seconds = 0;
    mins = 0;
    lapCounter = 1;
    lapTimes = [];
    updateTimerDisplay();
    clearLapList();
});

btnLap.addEventListener('click', () => {
    if (lapCounter <= 3) {
        const lapTime = formatTime(mins, seconds, tens);
        lapTimes.push({ lap: lapCounter, time: lapTime });
        updateLapList();
        lapCounter++;
    }
});

function startTimer() {
    tens++;
    if (tens > 99) {
        seconds++;
        tens = 0;
    }
    if (seconds > 59) {
        mins++;
        seconds = 0;
    }
    updateTimerDisplay();
}

function updateTimerDisplay() {
    getTens.innerHTML = padWithZero(tens);
    getSeconds.innerHTML = padWithZero(seconds);
    getMins.innerHTML = padWithZero(mins);
}

function padWithZero(value) {
    return value < 10 ? '0' + value : value;
}

function formatTime(mins, seconds, tens) {
    return `${padWithZero(mins)}:${padWithZero(seconds)}.${padWithZero(tens)}`;
}

function updateLapList() {
    const listItem = document.createElement('li');
    const lastLapIndex = lapTimes.length - 1;
    listItem.textContent = `Lap ${lapTimes[lastLapIndex].lap}: ${lapTimes[lastLapIndex].time}`;
    lapList.appendChild(listItem);
}

function clearLapList() {
    lapList.innerHTML = '';

    const startIndex = Math.max(0, lapTimes.length - 3);
    for (let i = startIndex; i < lapTimes.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `Lap ${lapTimes[i].lap}: ${lapTimes[i].time}`;
        lapList.appendChild(listItem);
    }
}