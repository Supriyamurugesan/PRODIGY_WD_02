let startTime, updatedTime, difference, timerID;
let running = false;
let lapNumber = 1;
const display = document.getElementById('display');
const laps = document.getElementById('laps');

document.getElementById('startBtn').addEventListener('click', start);
document.getElementById('pauseBtn').addEventListener('click', pause);
document.getElementById('resetBtn').addEventListener('click', reset);
document.getElementById('lapBtn').addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerID = setInterval(update, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(timerID);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function reset() {
    clearInterval(timerID);
    startTime = null;
    updatedTime = null;
    difference = null;
    running = false;
    display.innerHTML = '00:00:00.0';
    laps.innerHTML = '';
    lapNumber = 1;
}

function lap() {
    if (running) {
        const lapTime = formatTime(new Date().getTime() - startTime);
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap ${lapNumber}: ${lapTime}`;
        laps.appendChild(lapElement);
        lapNumber++;
    }
}

function update() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(time) {
    let milliseconds = parseInt((time % 1000) / 100);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        milliseconds
    );
}
