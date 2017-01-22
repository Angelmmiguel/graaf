function guideGrid(el) {
  var currentStep = parseInt(el.getAttribute('data-step'));

  switch (currentStep) {
    case 0:
      // Add link
      var link = document.createElement('link');
      link.href = '//s3-eu-west-1.amazonaws.com/graaf/graaf.css';
      link.rel = 'stylesheet';
      link.media = 'all';
      link.type = 'text/css';
      document.head.appendChild(link);

      // Update step
      guideStep1();
      el.setAttribute('data-step', 1);
      break;
    case 1:
      // Add no-grid
      document.body.classList.add('no-grid');
      // Update step
      guideStep2();
      el.setAttribute('data-step', 2);
      break;
    default:
      // Remove no-grid
      document.body.classList.remove('no-grid');
      // Update step
      guideStep1();
      el.setAttribute('data-step', 1);
      break;
  }
}

function guideStep1() {
  document.querySelector('.try button').innerHTML = 'Hide grid';
  document.querySelector('.try .description').innerHTML = 'Now, you can hide the grid adding <code>.no-grid</code> class to <code>body</code>';
  document.querySelector('.try .code').style.display = 'none';
}

function guideStep2() {
  document.querySelector('.try button').innerHTML = 'Show grid';
  document.querySelector('.try .description').innerHTML = 'If you want to recover the grid, just remove <code>.no-grid</code> class from <code>body</code>';
  document.querySelector('.try .code').style.display = 'none';
}
