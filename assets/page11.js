document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var scene = document.getElementById('scene');
  var reins = document.getElementById('rein-control');
  if (!scene || !reins) return;

  var startY = null;
  var pullThreshold = 55;
  var hasRisen = false;

  function raiseChariot() {
    if (hasRisen) return;
    hasRisen = true;
    scene.classList.add('is-rising');
    reins.classList.remove('is-pulling');
    reins.setAttribute('aria-pressed', 'true');
  }

  reins.addEventListener('pointerdown', function (event) {
    if (hasRisen) return;
    startY = event.clientY;
    reins.classList.add('is-pulling');
    reins.setPointerCapture(event.pointerId);
  });

  reins.addEventListener('pointermove', function (event) {
    if (startY === null || hasRisen) return;

    var upwardDistance = startY - event.clientY;
    if (upwardDistance >= pullThreshold) {
      raiseChariot();
    }
  });

  reins.addEventListener('pointerup', function (event) {
    if (startY !== null && !hasRisen) {
      var upwardDistance = startY - event.clientY;
      if (upwardDistance >= pullThreshold) {
        raiseChariot();
      }
    }

    startY = null;
    if (!hasRisen) reins.classList.remove('is-pulling');
  });

  reins.addEventListener('pointercancel', function () {
    startY = null;
    if (!hasRisen) reins.classList.remove('is-pulling');
  });

  reins.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      raiseChariot();
    }
  });
});
