function TouchDevice() {
	return 'ontouchstart' in document.documentElement;
}

const lottiePlayerWrp = document.querySelector('.lottie-player-wrp');
const lottiePlayer = lottiePlayerWrp.querySelector('lottie-player');
const preloader = document.querySelector('.preloader');

if (!TouchDevice()) {
	lottiePlayer.load('https://uploads-ssl.webflow.com/61a9c09bb225b005add42e9c/61fa996d661869b5cc4c900d_CA-Fin.json');
	lottiePlayer.addEventListener('ready', () => {
		preloader.style.opacity = '0';
		setTimeout(() => {
			preloader.remove();
		}, 1050);
	});
} else {
	preloader.remove();
	lottiePlayerWrp.remove();
}
