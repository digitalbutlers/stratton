
// eslint-disable-next-line
const wwdSwiper = new Swiper('.follow__swiper', {
  loop: false,
  simulateTouch: true,
  slidesPerView: 'auto',
  slidesPerGroup: 1,
  speed: 500,
  breakpoints: {
    992: {
      loop: true,
      slidesPerView: 'auto',
      slidesPerGroup: 2,
      speed: 500,
      navigation: {
        nextEl: '.follow__swiper-btn--next',
        prevEl: '.follow__swiper-btn--prev',
      },
    },
  },
});
