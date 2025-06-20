export function timer() {
  function startCountdown(targetDate, selectors) {
    if (!document.querySelector(selectors[0])) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const distance = targetDate - now;

      let days = "00",
        hours = "00",
        minutes = "00",
        seconds = "00";

      if (distance > 0) {
        days = Math.floor(distance / (1000 * 60 * 60 * 24))
          .toString()
          .padStart(2, "0");
        hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
          .toString()
          .padStart(2, "0");
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0");
        seconds = Math.floor((distance % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0");
      } else {
        clearInterval(interval);
      }

      [days, hours, minutes, seconds].forEach((val, i) => {
        const el = document.querySelector(selectors[i]);
        if (el) el.innerHTML = val;
      });
    }, 1000);
  }

  const targetDate = Date.now() + 361 * 24 * 60 * 60 * 1000;

  startCountdown(targetDate, ["#days", "#hours", "#minutes", "#seconds"]);
  startCountdown(targetDate, [".days", ".hours", ".minutes", ".seconds"]);
  startCountdown(targetDate, ["#days2", "#hours2", "#minutes2", "#seconds2"]);
  startCountdown(targetDate, ["#days3", "#hours3", "#minutes3", "#seconds3"]);
}
