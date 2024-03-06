import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import error from "../img/error-icon.svg";


const inputEl = document.querySelector("#datetime-picker");
const startBtn = inputEl.nextElementSibling;
const spanElems = document.querySelectorAll(".value");
let userSelectedDate;
const currentDate = Date.now();

startBtn.disabled = true;

startBtn.addEventListener("click", onBtnClick);

function onBtnClick() { 
    startBtn.disabled = true;
    inputEl.disabled = true;
    const futureTime = new Date(inputEl.value);
    const intervalId = setInterval(() => { 
        const currentTime = Date.now();
        const diff = futureTime.getTime() - currentTime;
        let { days, hours, minutes, seconds } = addLeadingZero(convertMs(diff));
        if (futureTime.getTime() > currentTime) {
            spanElems[0].textContent = days;
            spanElems[1].textContent = hours;
            spanElems[2].textContent = minutes;
            spanElems[3].textContent = seconds;
        } 
        if (diff < 1000) {
            clearInterval(intervalId);
            inputEl.disabled = false;
        }
    }, 1000)
}

function addLeadingZero(obj) { 
    let { days, hours, minutes, seconds } = obj;
    days = String(days).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() <= currentDate) {
            startBtn.disabled = true;
            return iziToast.show({
                title: "Error",
                titleColor: "#fff",
                color: "#ef4040",
                message: "Please choose a date in the future",
                messageColor: "#fff",
                position: "topRight",
                iconUrl: error,
            });
        }
        startBtn.disabled = false;
        userSelectedDate = selectedDates[0];
  },
};

flatpickr(inputEl, options);


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

