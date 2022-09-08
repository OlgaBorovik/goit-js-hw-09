import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  btn: document.querySelector('button'),
}


function onClickSubmit(evt) {
  evt.preventDefault()
  const {
    elements: { delay, step, amount },
  } = evt.currentTarget;

  // console.log(delay.value, step.value, amount.value)

  const numDelay = Number(delay.value);
  const numStep = Number(step.value);
  const numAmount = Number(amount.value);

  for (let i = 0; i < numAmount; i++){
    
    createPromise(i + 1, numDelay + i * numStep)
    .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.warning(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
  }
  evt.currentTarget.reset();
}
   


function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
  
  setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
  

refs.form.addEventListener('submit', onClickSubmit)

