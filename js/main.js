function isModal() {
  let modalBtns = document.querySelectorAll('.modal__btn');

  if (modalBtns.length > 0) {
    for (let modalBtn of modalBtns) {
      modalBtn.addEventListener('click', function () {
        let modalBtnData = modalBtn.getAttribute('data-modal-src');
        let modalWindow = document.querySelector(`*[data-modal-window="${modalBtnData}"]`);
        let body = document.querySelector('body');

        if (modalWindow) {
          modalWindow.classList.add('active');
          body.classList.add('lock');
        }
      });
    }
  }
}

function isModalClose() {
  let modalCloseBtns = document.querySelectorAll('.modal__close-btn');
  if (modalCloseBtns.length > 0) {
    for (let modalCloseBtn of modalCloseBtns) {
      modalCloseBtn.addEventListener('click', function () {
        let modalWindow = modalCloseBtn.closest('*[data-modal-window]');
        let body = document.querySelector('body');

        modalWindow.classList.remove('active');
        body.classList.remove('lock');
      });
    }
  }
}

function isTimer() {
  let dateNow = new Date();
  let minutesDeadline = 80;
  dateNow.setMinutes(dateNow.getMinutes() + minutesDeadline);

  function countdownTimer() {
    const diff = dateNow - new Date();
    if (diff <= 0) {
      clearInterval(timerId);
    }

    const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    const milSeconds = diff > 0 ? Math.floor(diff) % 100 : 0;

    let hoursString = hours < 10 ? '0' + hours : String(hours);
    let minutesString = minutes < 10 ? '0' + minutes : String(minutes);
    let secondsString = seconds < 10 ? '0' + seconds : String(seconds);
    let milsecString = milSeconds < 10 ? '0' + milSeconds : String(milSeconds);

    let hoursArr = hoursString.split('');
    let minutesArr = minutesString.split('');
    let secondsArr = secondsString.split('');
    let milsecArr = milsecString.split('');

    for (let i = 0; i < timerMilSecItems.length; i++) {
      timerMilSecItems[i].innerHTML = milsecArr[i];
    }
    for (let i = 0; i < timerMinutesItems.length; i++) {
      timerMinutesItems[i].innerHTML = minutesArr[i];
    }
    for (let i = 0; i < timerSecondsItems.length; i++) {
      timerSecondsItems[i].innerHTML = secondsArr[i];
    }
    for (let i = 0; i < timerHoursItems.length; i++) {
      timerHoursItems[i].innerHTML = hoursArr[i];
    }
  }
  let timer = document.querySelector('.timer');

  let timerHours = timer.querySelector('[data-timer-hours]');
  let timerMinuts = timer.querySelector('[data-timer-minuts]');
  let timerSeconds = timer.querySelector('[data-timer-seconds]');
  let timerMilSec = timer.querySelector('[data-timer-milsec]');

  let timerHoursItems = timerHours.querySelectorAll('.timer__item-num');
  let timerMinutesItems = timerMinuts.querySelectorAll('.timer__item-num');
  let timerSecondsItems = timerSeconds.querySelectorAll('.timer__item-num');
  let timerMilSecItems = timerMilSec.querySelectorAll('.timer__item-num');

  // вызываем функцию countdownTimer
  countdownTimer();
  // вызываем функцию countdownTimer каждую секунду
  let timerId = setInterval(countdownTimer, 85);
}

isModal();
isModalClose();
isTimer();
