
const searchForm = document.querySelector('[data-search="form"]');
const searchInput = document.querySelector('[data-search="input"]');
const searchCross = document.querySelector('[data-search="cross"]');
const searchItems = [...document.querySelectorAll('[data-search="item"]')];
const searchNotFound = document.querySelector('[data-search="not-found"]');
const searchNotFoundWrp = searchNotFound.parentNode;
const mainCard = document.querySelector('.insights__card.insights__card--main');


const obj = {
  form: searchForm, input: searchInput, cross: searchCross, items: searchItems, notFound: searchNotFound,
};

function showNotFound() {
  const activeTab = document.querySelector('[data-tabs="tab"].js--active');
  if (getComputedStyle(activeTab).height === '0px') {
    searchNotFoundWrp.style.display = 'block';
  } else {
    searchNotFoundWrp.style.display = 'none';
  }
}

function ShowOrHideMain(items, value) {
  items.forEach((item) => {
    const mainContent = item.querySelector('.insights__card-main:not(.w-condition-invisible)');
    if (!!mainContent && !!mainCard && window.innerWidth > 991) {
      if (value === '') {
        item.classList.add('js--disable');
        mainCard.style.display = 'grid';
      } else {
        item.classList.remove('js--disable');
        mainCard.style.display = 'none';
      }
    }
  });
}

ShowOrHideMain(searchItems, searchInput.value);

function searchInit() {
  function noSubmit(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
  function search() {
    this.value = this.input.value;
    // show cross
    if (this.value !== '') {
      this.cross.classList.add('js--active');
    } else {
      this.cross.classList.remove('js--active');
    }
    // not found search-value
    this.notFound.textContent = `${this.value}`;

    ShowOrHideMain(this.items, this.value);

    // filter search items
    this.items.forEach((item) => {
      const title = item.querySelector('h3');
      if (title.textContent.toLowerCase().includes(this.value.toLowerCase())) {
        item.style.display = 'block';
        const str = title.textContent;
        const strStart = title.textContent.toLowerCase().indexOf(this.value.toLowerCase());
        const strEnd = strStart + this.value.length;
        title.innerHTML = str.replace(`${str.slice(strStart, strEnd)}`, `<span class="search-value">${str.slice(strStart, strEnd)}</span>`);
      } else {
        item.style.display = 'none';
      }
    });
    showNotFound();
  }
  this.form.addEventListener('submit', (e) => { noSubmit(e); });
  this.input.addEventListener('input', () => { search.call(obj); });
  this.cross.addEventListener('click', () => {
    searchInput.value = '';
    search.call(obj);
  });
}

const selectCls = 'search__select';

const select = document.querySelector(`.${selectCls}`);
const selectBtnText = document.querySelector(`.${selectCls}-btn`);

function openSelect(e) {
  if (!!e.target.closest(`.${selectCls}`)) {
    select.classList.toggle('js--active');
  } else {
    select.classList.remove('js--active');
  }
}
function changeSelectText(btn) {
  selectBtnText.firstChild.textContent = btn.firstChild.textContent;
}

window.addEventListener('click', (e) => { openSelect(e); });
window.addEventListener('resize', () => { select.classList.remove('js--active'); });

searchInit.call(obj);

class KisTabs {
  constructor({
    tabSelector,
    btnSelector,
    navSelector,
    activeClass = 'js--active',
    eventType = 'click',
    initialTab = 0,
    hasMovingBackground = false,
    movingBackgroundClass = 'tabs__background',
    searchParameterName,
    tabNameAttribute = 'data-tab-name',
  }) {
    this.tabs = document.querySelectorAll(tabSelector);
    this.tabsNames = new Array(this.tabs.length);
    this.btns = document.querySelectorAll(btnSelector);
    this.nav = document.querySelector(navSelector) || this.btns[0]?.parentNode;
    this.activeClass = activeClass;
    this.eventType = eventType;
    this.initialTab = initialTab;
    this.currentTabIndex = 0;
    this.prev = [];
    this.movingBackground = undefined;
    this.hasMovingBackground = hasMovingBackground;
    this.movingBackgroundClass = movingBackgroundClass;
    this.searchParameterName = searchParameterName;
    this.tabNameAttribute = tabNameAttribute;
  }

  init() {
    this.initBtns();
    this.initUnderline();
    this.initSearchParamsLogic();
    this.setInitTabIndex();

    this.goTo(this.currentTabIndex);
    return this;
  }

  goTo(_id) {
    const id = typeof _id === 'string' ? this.tabsNames.indexOf(_id) : _id;

    if (this.prev.length && this.prev[this.prev.length - 1] === id) {
      this.prev.pop();
    } else {
      this.prev.push(this.currentTabIndex);
    }

    this.currentTabIndex = id;

    // set active class to current tab
    this.tabs.forEach((tab) => {
      tab.classList.remove(this.activeClass);
    });
    this.tabs[id].classList.add(this.activeClass);

    // set active class to current button
    if (this.btns.length) {
      this.btns.forEach((btn) => {
        btn.classList.remove(this.activeClass);
      });
      this.btns[id].classList.add(this.activeClass);
    }

    // set background position
    if (this.hasMovingBackground) {
      this.movingBackground.style.left = `${this.btns[id].offsetLeft}px`;
      this.movingBackground.style.top = `${this.btns[id].offsetTop}px`;
      this.movingBackground.style.width = `${this.btns[id].offsetWidth}px`;
      this.movingBackground.style.height = `${this.btns[id].offsetHeight}px`;
    }

    // set url parameter
    if (this.searchParameterName) {
      const url = new URL(window.location);
      url.searchParams.set(this.searchParameterName, this.tabsNames[id]);
      // eslint-disable-next-line no-restricted-globals
      history.replaceState(null, null, url.toString());
    }

    return this.tabs[id];
  }

  goToNext() {
    return this.goTo(this.currentTabIndex + 1);
  }

  goToPrev() {
    return this.goTo(this.prev[this.prev.length - 1]);
  }

  initBtns() {
    if (!this.btns.length) { return; }

    this.btns.forEach((btn, i) => {
      if (i === 0) {
        changeSelectText(btn);
      }
      btn.addEventListener(this.eventType, () => {
        this.goTo(i);
        showNotFound();
        changeSelectText(btn);
      });
    });
  }

  initUnderline() {
    if (!this.hasMovingBackground) { return; }
    let movingBackground = this.nav.querySelector(`.${this.movingBackgroundClass}`);

    if (!movingBackground) {
      movingBackground = document.createElement('span');
      movingBackground.classList.add(this.movingBackgroundClass);
      this.nav.append(movingBackground);
    }

    this.movingBackground = movingBackground;
  }

  initSearchParamsLogic() {
    if (!this.searchParameterName) { return; }

    for (let i = 0; i < this.tabs.length; i += 1) {
      this.tabsNames[i] = this.tabs[i].getAttribute(this.tabNameAttribute) || `${i}`;
    }
  }

  setInitTabIndex() {
    if (typeof this.initialTab === 'number') {
      this.currentTabIndex = this.initialTab;
    } else {
      this.currentTabIndex = this.tabsNames.indexOf(this.initialTab);
    }
    return this.currentTabIndex;
  }
}

const tabs = new KisTabs({
  tabSelector: '[data-tabs="tab"]',
  btnSelector: '[data-tabs="btn"]',
});

tabs.init();
