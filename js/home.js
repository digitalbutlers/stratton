function testState() {
  const popUp = document.querySelector('.home__focus-pu');
  const mainSwiper = document.querySelector('.home__swiper');

  popUp.classList.remove('js--open');
  mainSwiper.classList.remove('test');
}

testState();


let swiperEnd = false;
let popUpOpen = false;

const swiperSection = document.querySelector('.home__swiper');
const preloader = document.querySelector('.preloader');
const homeHeroImg = document.querySelector('.home__hero-img');
const swiperSlidesContent = document.querySelectorAll('[data-slide="content"]');

if (window.innerWidth < 480) {
  // eslint-disable-next-line
  const insightsSwiper = new Swiper('.insights__swiper', {
    slidesPerView: 1.2,
    spaceBetween: 40,
  });
}

function hideSwiper(Diff) {
  if (!popUpOpen) {
    if (swiperEnd && Diff > 0 && window.pageYOffset === 0) {
      swiperSection.classList.add('home__swiper--hide');
      document.body.style.overflow = 'visible';
      setTimeout(() => {
      // eslint-disable-next-line
        header.classList.remove('header--hide');
      }, 1000);
    } else if (swiperEnd && Diff < 0 && window.pageYOffset === 0) {
      swiperSection.classList.remove('home__swiper--hide');
      document.body.style.overflow = 'hidden';
    }
  }
}

function swiperPointerEvents(delay, swiper) {
  swiperSection.style.pointerEvents = 'none';
  swiperSlidesContent[swiper.previousIndex].style.opacity = '0';
  setTimeout(() => {
    swiperSection.style.pointerEvents = 'auto';
    swiperSlidesContent[swiper.activeIndex].style.opacity = '1';
  }, delay);
}

function initFocusPopup(swiper) {
  const breakpoint = 991;

  const isSlider = window.innerWidth < breakpoint;

  const selectors = {
    wrapper: '.pu__content',
    navigation: '.pu__img',
    content: '.pu__stages',
    contentItem: '.pu__stage',
  };

  // eslint-disable-next-line
  const setMarkup = function setTabsOrSwiperMurkupDependsOnResolution(selectors) {
    const tabsClasses = {
      wrapper: 'tabs',
      navigation: 'tabs__nav',
      content: 'tabs-inner',
      contentItem: 'tab',
    };

    const classesToSet = tabsClasses;


    // eslint-disable-next-line
    for (const selectorsKey in selectors) {
    // eslint-disable-next-line
      if (selectors.hasOwnProperty(selectorsKey)) {
        document.querySelectorAll(selectors[selectorsKey]).forEach((element) => {
          if (classesToSet[selectorsKey]) {
            element.classList.add(classesToSet[selectorsKey]);
          }
        });
      }
    }
  };

  setMarkup(selectors);

  let popupTabs;
  let popupSlider;


  // eslint-disable-next-line
  popupTabs = new KisTabs({
    tabSelector: selectors.contentItem,
    btnSelector: `${selectors.navigation} > *`,
  });

  popupTabs.init();

  document.querySelectorAll('[go-to-pu-tab]').forEach((link) => {
    link.addEventListener('click', (event) => {
      popupTabs.goTo(+event.currentTarget.getAttribute('go-to-pu-tab'));
    });
  });


  // popup
  const popup = document.querySelector('.home__focus-pu');
  const openClass = 'js--open';
  const toggles = document.querySelectorAll('.home__focus-point');
  const closeButton = document.querySelector('.pu__close');

  toggles.forEach((point, index) => {
    point.addEventListener('click', () => {
      popUpOpen = true;
      // eslint-disable-next-line
      header.classList.add('header--hide');
      swiper.disable();
      if (!isSlider) {
        popupTabs.goTo(index);
      } else {
        popupSlider.slideTo(index);
      }
      popup.classList.add(openClass);
    });
  });
  closeButton.addEventListener('click', () => {
    popUpOpen = false;
    swiper.enable();
    popup.classList.remove(openClass);
  });
}

function preloaderReady() {
  // eslint-disable-next-line no-undef
  const lottiePlayerInner = lottiePlayer.renderRoot.children[0].querySelector('#__lottie_element_4');

  if (!lottiePlayerInner) {
    setTimeout(preloaderReady, 1000);
    return;
  }
  preloader.style.opacity = '0';
  setTimeout(() => {
    preloader.remove();
  }, 1050);
}

if (window.innerWidth > 991) {
  document.body.style.overflow = 'hidden';
  swiperSlidesContent[0].style.opacity = '1';

  // eslint-disable-next-line
  const homeSwiper = new Swiper('.home__swiper', {
    direction: 'vertical',
    slidesPerView: 1,
    mousewheel: true,
    speed: 1000,
  });


  // eslint-disable-next-line
  headerBtn.addEventListener('click', () => {
  // eslint-disable-next-line
    if (isMenuOpen === true) {
      homeSwiper.disable();
    } else {
      homeSwiper.enable();
    }
  });

  const swiperSlidesBtnNext = document.querySelectorAll('[data-slide="btn-next"]');
  const swiperSlidesBtnEnd = document.querySelector('[data-slide="btn-end"]');
  for (let i = 0; i < swiperSlidesBtnNext.length; i += 1) {
    swiperSlidesBtnNext[i].addEventListener('click', () => {
      homeSwiper.slideNext();
    });
  }
  swiperSlidesBtnEnd.addEventListener('click', () => {
    hideSwiper(1);
  });
  window.addEventListener('wheel', (e) => {
    hideSwiper(e.deltaY);
  });


  const setLottieFrame = function smoothlySetLottieToNFrame(lottie, nextFrame, time = 300) {
  // eslint-disable-next-line no-underscore-dangle
    const prevFrame = lottie._lottie.currentFrame;
    const diff = nextFrame - prevFrame;

    let start;

    function step(timestamp) {
      if (!start) {
        start = timestamp;
      }
      const progress = Math.round(timestamp - start);
      let current = progress / time;
      if (current > 1) current = 1;

      const frame = prevFrame + Math.floor(current * diff);
      lottie.seek(frame);

      if (progress < time) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  };


  document.body.classList.add('black-bg');

  homeSwiper.on('activeIndexChange', () => {
    let opacityDelay = 0;

    function lottiePlay(n) {
      // eslint-disable-next-line
      setLottieFrame(lottiePlayer, n * (lottiePlayer._lottie.totalFrames - 1), opacityDelay);
    }

    // lottie steps
    if (homeSwiper.activeIndex === 0) {
      document.body.classList.add('black-bg');
      opacityDelay = 1000;
      swiperPointerEvents(opacityDelay, homeSwiper);
    }
    if (homeSwiper.activeIndex === 1) {
      homeHeroImg.classList.remove('js--disable');
      document.body.classList.add('black-bg');
      opacityDelay = 1000;
      lottiePlay(0);
      swiperPointerEvents(opacityDelay, homeSwiper);
    }
    if (homeSwiper.activeIndex === 2) {
      opacityDelay = 3000;
      lottiePlay(0.4);
      swiperPointerEvents(opacityDelay, homeSwiper);
      if (homeSwiper.previousIndex === 1) {
        homeHeroImg.classList.add('js--disable');
        document.body.classList.remove('black-bg');
      }
    }
    if (homeSwiper.activeIndex === 3) {
      if (homeSwiper.previousIndex === 2) {
        opacityDelay = 2000;
      } else {
        // eslint-disable-next-line no-undef
        lottiePlayerWrp.style.opacity = '1';
        opacityDelay = 1000;
      }
      lottiePlay(1);
      swiperPointerEvents(opacityDelay, homeSwiper);
    }
    if (homeSwiper.activeIndex === 4) {
      // eslint-disable-next-line no-undef
      lottiePlayerWrp.style.opacity = '0';
      opacityDelay = 1000;
      swiperPointerEvents(opacityDelay, homeSwiper);
    }

    // set swiperEnd value
    if (homeSwiper.isEnd) {
      setTimeout(() => {
        swiperEnd = true;
      }, opacityDelay);
    } else {
      swiperEnd = false;
    }
  });

  initFocusPopup(homeSwiper);

  preloaderReady();
} else {
  preloader.remove();

  // eslint-disable-next-line
  const puSwiper = new Swiper('.pu__swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.pu__pag',
      type: 'bullets',
    },
  });


  const puImgPieces = document.querySelectorAll('.pu__img-piece');

  puImgPieces[0].classList.add('js--active');
  puSwiper.on('activeIndexChange', () => {
    for (let i = 0; i < puImgPieces.length; i += 1) {
      puImgPieces[i].classList.remove('js--active');
      if (puSwiper.activeIndex === i) {
        puImgPieces[i].classList.add('js--active');
      }
    }
  });
}

