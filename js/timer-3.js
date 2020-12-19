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

  getRefs() {
    const remainingDaysFieldRef = document.querySelector(
      `${this.selector} span[data-value="days"]`,
    );
    const remainingHoursFieldRef = document.querySelector(
      `${this.selector} span[data-value="hours"]`,
    );
    const remainingMinutesFieldRef = document.querySelector(
      `${this.selector} span[data-value="mins"]`,
    );
    const remainingSecondsFieldRef = document.querySelector(
      `${this.selector} span[data-value="secs"]`,
    );

    return {
      days: remainingDaysFieldRef,
      hours: remainingHoursFieldRef,
      minutes: remainingMinutesFieldRef,
      seconds: remainingSecondsFieldRef,
    };
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

const refs = countdownTimer.getRefs();

countdownTimer.start(refs);
