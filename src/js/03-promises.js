const refs = {
  form: document.querySelector('.form'),
  delay:document.querySelector('input[name="delay"]'),
  step:document.querySelector('input[name="step"]'),
  amount:document.querySelector('input[name="amount"]'),
  btn: document.querySelector('button'),
}


function createPromise(position, delay) {
  return new Promise(resolve => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay })
    } else {
      // Reject
    }
  })

}



refs.form.addEventListener('submit', createPromise())


// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });