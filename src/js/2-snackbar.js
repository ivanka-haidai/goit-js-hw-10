import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

const formElem = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const radioBtn = document.querySelector('input[name="state"]');
const submitBtn = document.querySelector('button[type="submit"]')




function showErrorMessage(delay) {
  iziToast.error({
    title: '❌ Error',
    message: `Rejected promise in ${delay}ms`,
    position: 'topRight',
  })
}

function showSuccessMessage(delay) {
  iziToast.success({
    title: '✅ Success',
    message: `Fulfilled promise in ${delay}ms`,
    position: 'topRight',
  })
}

formElem.addEventListener('submit', (e) => {
  e.preventDefault();
  const delayInputVal = Number(delayInput.value);
  const radioBtnVal = formElem.elements.state.value;

  const delay = Number(delayInput.value);
  const shouldResolve = formElem.elements.state.value === 'fulfilled';

  
    createPromise(delay, shouldResolve).then(delay => {
      showSuccessMessage(delay)
    }).catch(delay=> showErrorMessage(delay))
  

    formElem.reset();
});


function createPromise(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
