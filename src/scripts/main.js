function isTouchDevice() {
	return 'ontouchstart' in document.documentElement;
}

// eslint-disable-next-line no-unused-vars
const breakpointXL = 991;
// eslint-disable-next-line no-unused-vars
const breakpointSM = 480;

const { body } = document;
const header = body.querySelector('.header');
const headerBtn = body.querySelector('.header__btn');

const headerBlurItems = [...body.children];
const headerBlurTags = ['main', 'section', 'footer'];
let isMenuOpen = false;
let yDownNav = null;

for (let i = 0; i < headerBlurItems.length; i += 1) {
	if (headerBlurTags.includes(headerBlurItems[i].tagName.toLowerCase())) {
		headerBlurItems[i].setAttribute('data-filter', 'true');
	}
}

function menuClose() {
	body.classList.remove('header-open');
	isMenuOpen = false;
}

headerBtn.addEventListener('click', () => {
	if (body.classList.contains('header-open')) {
		menuClose();
	} else {
		body.classList.add('header-open');
		isMenuOpen = true;
	}
});

window.addEventListener('click', (event) => {
	if (!event.target.closest('.header__menu') && !event.target.closest('.header__btn')) {
		menuClose();
	}
});

// hide navbar function
function hideNavbar(Diff) {
	if (!isMenuOpen) {
		if (Diff > 0) {
			header.classList.add('header--hide');
		} else {
			header.classList.remove('header--hide');
		}
	}
	if (window.pageYOffset < 1) {
		header.classList.remove('scrolled');
	} else {
		header.classList.add('scrolled');
	}
}

// nav direction for mobile
function handleTouchStart(event) {
	const firstTouch = event.touches[0];
	yDownNav = firstTouch.clientY;
}
function handleTouchMove(event) {
	if (!yDownNav) {
		return;
	}
	const yDiff = yDownNav - event.touches[0].clientY;
	hideNavbar(yDiff);
	yDownNav = null;
}

if (isTouchDevice()) {
	document.addEventListener('touchstart', handleTouchStart, false);
	document.addEventListener('touchmove', handleTouchMove, false);
} else {
	window.addEventListener('wheel', (event) => {
		hideNavbar(event.deltaY);
	});
}


