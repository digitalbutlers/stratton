// eslint-disable-next-line
const wwdSwiper = new Swiper('.wwd__swiper', {
	loop: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	spaceBetween: 16,
	autoplay: {
		delay: 4000,
	},
	speed: 500,
	breakpoints: {
		992: {
			loop: true,
			centeredSlides: true,
			autoplay: {
				delay: 4000,
			},
			slidesPerView: 2,
			speed: 500,
			navigation: {
				nextEl: '.wwd__swiper-btn--next',
				prevEl: '.wwd__swiper-btn--prev',
			},
		},
	},
});

// eslint-disable-next-line
const majorSwiper = new Swiper('.wwd__major-swiper', {
	slidesPerView: 1,
	autoHeight: true,
	navigation: {
		nextEl: '.wwd__major-swiper-btn.wwd__major-swiper-btn--next',
		prevEl: '.wwd__major-swiper-btn.wwd__major-swiper-btn--prev',
	},
	effect: 'fade',
	fadeEffect: {
		crossFade: true,
	},
	pagination: {
		el: '.wwd__major-swiper-pagination',
		clickable: true,
		type: 'bullets',
	},
	breakpoints: {

		992: {
			pagination: {
				el: '.wwd__major-swiper-pagination',
				clickable: true,

				renderBullet(index, className) {
					return `<span class="${className}">${this.slides[index].querySelector('.h-lg').textContent}</span>`;
				},
			},
		},
	},
});
