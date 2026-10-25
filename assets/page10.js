document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var torch = document.getElementById('torch-control');
  var nextButton = document.getElementById('undertext');
  var content = document.getElementById('content');

  if (torch && nextButton) {
    torch.addEventListener('click', function () {
      torch.classList.add('taken');
      torch.setAttribute('aria-pressed', 'true');
      torch.disabled = true;

      nextButton.disabled = false;
      nextButton.removeAttribute('aria-hidden');
      nextButton.classList.add('visible');

      if (content) {
        content.scrollTo({
          top: content.scrollHeight,
          behavior: 'smooth'
        });
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', function () {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'NEXT_PAGE' }, '*');
      } else {
        window.location.href = './11.html';
      }
    });
  }
});
