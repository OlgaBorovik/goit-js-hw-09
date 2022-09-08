
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body')
let timerId = null;

startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
      startBtn.setAttribute('disabled', true)
      body.style.backgroundColor = getRandomHexColor();
      console.log(`Color ${getRandomHexColor()}`)
  }, 1000);
});


stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    startBtn.removeAttribute('disabled')
  console.log(`Interval with id ${timerId} has stopped!`);
});