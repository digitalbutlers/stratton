function TouchDevice() {
  return 'ontouchstart' in document.documentElement;
}

const lottiePlayerWrp = document.querySelector('.lottie-player-wrp');
const lottiePlayer = lottiePlayerWrp.querySelector('lottie-player');

if (!TouchDevice()) {
  lottiePlayer.setAttribute('src', `${lottiePlayer.getAttribute('data-src')}`);
} else {
  lottiePlayerWrp.remove();
}

// lottiePlayer.setAttribute('src', `${lottiePlayer.getAttribute('data-src')}`);

