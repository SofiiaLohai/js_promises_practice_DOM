'use strict';

'use strict';

const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const thirdPromise = new Promise((resolve) => {
  let hasLeftClicked = false;
  let hasRightClicked = false;

  const checkBothClicks = () => {
    if (hasLeftClicked && hasRightClicked) {
      resolve('Third promise was resolved');
    }
  };

  document.addEventListener('click', () => {
    hasLeftClicked = true;
    checkBothClicks();
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    hasRightClicked = true;
    checkBothClicks();
  });
});

const successHandler = (message) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('success');
  div.textContent = message;
  document.body.appendChild(div);
};

const errorHandler = (error) => {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add('error');
  div.textContent = error.message || error;
  document.body.appendChild(div);
};

firstPromise.then(successHandler).catch(errorHandler);
secondPromise.then(successHandler);
thirdPromise.then(successHandler);
