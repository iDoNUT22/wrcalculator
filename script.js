function calculate() {
  const D = parseFloat(document.getElementById("desired").value);
  const C = parseInt(document.getElementById("battles").value);
  const W = parseFloat(document.getElementById("current").value);

  if (isNaN(D) || isNaN(C) || isNaN(W) || C <= 0 || D <= 0 || W < 0 || W > 100 || D > 100) {
    document.getElementById("result").innerText = "Please enter valid inputs.";
    return;
  }

  const currentWins = (W / 100) * C;

  if (D >= 100) {
    document.getElementById("result").innerText = "Desired win rate must be less than 100%.";
    return;
  }

  const X = (D * C - 100 * currentWins) / (100 - D);

  if (X < 0) {
    document.getElementById("result").innerText = "You already meet or exceed the desired win rate!";
  } else {
    document.getElementById("result").innerText = `You need approximately ${Math.ceil(X)} more consecutive wins.`;
  }
}

let grindInterval, sleepInterval;

function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function startGrindTimer() {
  const hours = parseInt(document.getElementById("grind-hours").value) || 0;
  const minutes = parseInt(document.getElementById("grind-minutes").value) || 0;
  const seconds = parseInt(document.getElementById("grind-seconds").value) || 0;
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  clearInterval(grindInterval);

  if (totalSeconds <= 0) {
    document.getElementById("grind-status").innerText = "Enter valid grind time.";
    document.getElementById("grind-countdown").innerText = "";
    return;
  }

  document.getElementById("grind-status").innerText = "Grinding... Stay focused!";
  document.getElementById("grind-countdown").innerText = formatTime(totalSeconds);

  grindInterval = setInterval(() => {
    totalSeconds--;
    document.getElementById("grind-countdown").innerText = formatTime(totalSeconds);

    if (totalSeconds <= 0) {
      clearInterval(grindInterval);
      document.getElementById("grind-status").innerText = "Grind session over!";
      document.getElementById("grind-countdown").innerText = "";
      document.getElementById("alarm-sound").play();
    }
  }, 1000);
}

function calculateSleep() {
  const sleepStart = document.getElementById("sleep-start").value;
  const sleepEnd = document.getElementById("sleep-end").value;

  clearInterval(sleepInterval);

  if (!sleepStart || !sleepEnd) {
    document.getElementById("sleep-result").innerText = "Please enter both sleep and wake times.";
    document.getElementById("sleep-countdown").innerText = "";
    return;
  }

  const now = new Date();
  const startParts = sleepStart.split(":");
  const endParts = sleepEnd.split(":");

  if (startParts.length !== 2 || endParts.length !== 2) {
    document.getElementById("sleep-result").innerText = "Invalid time format.";
    return;
  }

  const start = new Date(now);
  const end = new Date(now);

  start.setHours(parseInt(startParts[0]), parseInt(startParts[1]), 0, 0);
  end.setHours(parseInt(endParts[0]), parseInt(endParts[1]), 0, 0);

  if (end <= start) {
    end.setDate(end.getDate() + 1);
  }

  const sleepMs = end - start;

  if (isNaN(sleepMs) || sleepMs <= 0) {
    document.getElementById("sleep-result").innerText = "Invalid time range.";
    return;
  }

  const totalMinutes = Math.floor(sleepMs / (1000 * 60));
  const displayHours = Math.floor(totalMinutes / 60);
  const displayMinutes = totalMinutes % 60;

  document.getElementById("sleep-result").innerText = `You'll sleep for approximately ${displayHours} hour(s) and ${displayMinutes} minute(s).`;

  let countdownSec = Math.floor(sleepMs / 1000);
  document.getElementById("sleep-countdown").innerText = formatTime(countdownSec);

  sleepInterval = setInterval(() => {
    countdownSec--;
    if (countdownSec <= 0) {
      clearInterval(sleepInterval);
      document.getElementById("sleep-countdown").innerText = "";
      document.getElementById("alarm-sound").play();
    } else {
      document.getElementById("sleep-countdown").innerText = formatTime(countdownSec);
    }
  }, 1000);
}
