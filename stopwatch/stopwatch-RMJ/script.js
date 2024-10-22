// Select the necessary DOM elements
const stopwatchOption = document.getElementById('stopwatch-option');
const timerOption = document.getElementById('timer-option');
const timerScreen = document.getElementById('timer-screen');
const stopwatchScreen = document.getElementById('stopwatch-screen');

const timerDisplay = document.getElementById('timer-display');
const stopwatchDisplay = document.getElementById('stopwatch-display');
const numberPad = document.getElementById('number-pad');
const startStopwatchBtn = document.getElementById('start-stopwatch');
const resetStopwatchBtn = document.getElementById('reset-stopwatch');
const startTimerBtn = document.getElementById('start-timer');
const resetTimerBtn = document.getElementById('reset-timer');

let timerInterval;
let stopwatchInterval;
let isTimerRunning = false;
let isStopwatchRunning = false;
let countdownTime = 0; // For the stopwatch (countdown)


// Switch between Timer and Stopwatch screens
stopwatchOption.addEventListener('click', () => {
    timerScreen.classList.add('hidden');
    stopwatchScreen.classList.remove('hidden');
});

timerOption.addEventListener('click', () => {
    stopwatchScreen.classList.add('hidden');
    timerScreen.classList.remove('hidden');
});

// Function to format time (hours, minutes, seconds, milliseconds)
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;
}

// Number pad functionality for countdown (stopwatch)
numberPad.addEventListener('click', (e) => {
    if (!isStopwatchRunning && e.target.tagName === 'BUTTON') {
        const value = e.target.textContent;
        countdownTime = (countdownTime * 10) + parseInt(value);
        stopwatchDisplay.textContent = formatTime(countdownTime);
    }
});

// Start/Pause functionality for Stopwatch (countdown)
startStopwatchBtn.addEventListener('click', () => {
    if (isStopwatchRunning) {
        clearInterval(stopwatchInterval);
        startStopwatchBtn.textContent = 'Start';
    } else {
        startStopwatchBtn.textContent = 'Pause';
        stopwatchInterval = setInterval(() => {
            if (countdownTime <= 0) {
                clearInterval(stopwatchInterval);
                alert("Countdown finished!");
                startStopwatchBtn.textContent = 'Start';
            } else {
                countdownTime -= 10; // Decrease time by 10ms
                stopwatchDisplay.textContent = formatTime(countdownTime);
            }
        }, 10);
    }
    isStopwatchRunning = !isStopwatchRunning;
});

// Reset functionality for Stopwatch
resetStopwatchBtn.addEventListener('click', () => {
    clearInterval(stopwatchInterval);
    isStopwatchRunning = false;
    countdownTime = 0;
    stopwatchDisplay.textContent = formatTime(countdownTime);
    startStopwatchBtn.textContent = 'Start';
});

// Timer start/pause functionality
startTimerBtn.addEventListener('click', () => {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        startTimerBtn.textContent = 'Start';
    } else {
        startTimerBtn.textContent = 'Pause';
        let startTime = Date.now();
        let elapsed = 0;
        timerInterval = setInterval(() => {
            elapsed = Date.now() - startTime;
            timerDisplay.textContent = formatTime(elapsed);
        }, 10);
    }
    isTimerRunning = !isTimerRunning;
});

// Reset functionality for Timer
resetTimerBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isTimerRunning = false;
    timerDisplay.textContent = '00:00:00:000';
    startTimerBtn.textContent = 'Start';
});


