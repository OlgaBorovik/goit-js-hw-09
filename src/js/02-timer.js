import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  datetimePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  dd: document.querySelector('[data-days]'),
  hh: document.querySelector('[data-hours]'),
  mm: document.querySelector('[data-minutes]'),
  ss: document.querySelector('[data-seconds]'),
  timerContainer: document.querySelector('.timer'),
  timerFields: document.querySelectorAll('.field'),
  timerValues: document.querySelectorAll('.value'),
  timerLabels: document.querySelectorAll('.label'),
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


refs.datetimePicker.setAttribute("style",
  "display: block; margin: auto; border-radius: 4px; width: 200px; height: 30px; text-align: center;")
refs.startBtn.setAttribute("style",
  "display: block; margin: 10px auto; border-radius: 4px; width: 200px; height: 30px")
refs.timerContainer.setAttribute("style", 
  "display: flex; flex-direction: row; align-items: center; justify-content: center;")
refs.timerFields.forEach((field) => field.setAttribute("style", 
  "display: flex; flex-direction: column; align-items: center;  padding: 5px 15px; font-size: 24px;"));

let intervalId = null
refs.startBtn.setAttribute('disabled', true)

const options = { enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    refs.startBtn.setAttribute('disabled', true)
    const selectedTime = selectedDates[0].getTime()
    if (selectedTime <= Date.now()) {
      Notify.failure('Please choose a date in the future')
      return
    } else {
      refs.startBtn.removeAttribute('disabled')
    }  
      function onButtonClick() {
        intervalId = setInterval(() => {
          const startTime = Date.now()
          const deltaTime = selectedTime - startTime;
          // console.log(deltaTime)
          const { days, hours, minutes, seconds } = convertMs(deltaTime)
        
          refs.dd.textContent = days
          refs.hh.textContent = hours
          refs.mm.textContent = minutes
          refs.ss.textContent = seconds
          
          const randomColor =  getRandomHexColor()
          refs.timerFields.forEach((field) => field.style.color = randomColor)

          if (deltaTime < 1000) {
            clearInterval(intervalId)
          }
        
        }, 1000)
      }
    refs.startBtn.addEventListener('click', onButtonClick)
      
    }

}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds9
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

flatpickr(refs.datetimePicker, options)

