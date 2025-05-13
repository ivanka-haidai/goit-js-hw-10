import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const selectDateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

startBtn.disabled = true;

let userSelectedDate; 
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentDate = new Date();
    const pickedDate = selectedDates[0];
    if(pickedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight'
  });
  startBtn.disabled = true;
    } else {
    userSelectedDate = pickedDate;
      startBtn.disabled = false;
    }
  },
  
  
};

flatpickr(selectDateInput, options);

startBtn.addEventListener('click', startTimer);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  const msTime = userSelectedDate - new Date();
  if (msTime <= 0) {
    clearInterval(timerId);
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(msTime);
  daysElem.textContent = addLeadingZero(days);
  hoursElem.textContent = addLeadingZero(hours);
  minutesElem.textContent = addLeadingZero(minutes);
  secondsElem.textContent = addLeadingZero(seconds);
}

function startTimer() {
  startBtn.disabled = true;
  selectDateInput.disabled = true;
  timerId = setInterval(updateTimer, 1000);
}




