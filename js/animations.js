const animationsStates = ['initialized', 'waiting', 'running', 'finished'];

const propertiesToAnimate = {
  slide: ['transform', 'opacity'],
  fade: ['opacity'],
  grow: ['transform'],
};

const animate = function animateTarget(target) {
  const data = target.dataset;
  const type = data.aType;
  const delay = +data.aDelay || 0;
  const transitionDuration = +data.aDuration || 800;
  const transitionParams = `${transitionDuration}ms ease 0ms`;

  const animationProperties = propertiesToAnimate[type];

  const transitions = [];
  for (let i = 0; i < animationProperties.length; i++) {
    const prop = animationProperties[i];
    transitions.push(`${prop} ${transitionParams}`);
  }
  const defaultTransition = target.style.transition;
  target.style.transition = transitions.join(', ');

  // change state attributes
  // eslint-disable-next-line prefer-destructuring
  data.aState = animationsStates[1];
  setTimeout(() => {
    // eslint-disable-next-line prefer-destructuring
    data.aState = animationsStates[2];
    setTimeout(() => {
      // eslint-disable-next-line prefer-destructuring
      data.aState = animationsStates[3];
      target.style.transition = defaultTransition;
    }, transitionDuration);
  }, delay);
};

const callback = function observerCallbackToAnimate(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const { target } = entry;
      animate(target);
      observer.unobserve(target);
    }
  });
};

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.0,
};
const animationsObserver = new IntersectionObserver(callback, options);
const targets = document.querySelectorAll('[data-a-type]');

for (let i = 0; i < targets.length; i++) {
  animationsObserver.observe(targets[i]);
  // eslint-disable-next-line prefer-destructuring
  targets[i].dataset.aState = animationsStates[0];
}
