const refs = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  minutes: document.querySelector('span[data-value="mins"]'),
  seconds: document.querySelector('span[data-value="secs"]'),
};

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateTimerFields({ days, hours, minutes, seconds }, time) {
  const amountOfDays = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const amountOfHours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  );
  const amountOfMinutes = pad(
    Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
  );
  const amountOfSeconds = pad(Math.floor((time % (1000 * 60)) / 1000));

  days.textContent = amountOfDays;
  hours.textContent = amountOfHours;
  minutes.textContent = amountOfMinutes;
  seconds.textContent = amountOfSeconds;
}

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  start(references) {
    updateTimerFields(references, 0);

    setInterval(() => {
      const delta = this.targetDate - Date.now();

      updateTimerFields(references, delta);
    }, 1000);
  }
}

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});

countdownTimer.start(refs);
