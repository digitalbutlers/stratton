
const searchForm = document.querySelector('[data-search="form"]');
const searchInput = document.querySelector('[data-search="input"]');
const searchCross = document.querySelector('[data-search="cross"]');
const searchItems = [...document.querySelectorAll('[data-search="item"]')];
const searchNotFound = document.querySelector('[data-search="not-found"]');
const searchNotFoundWrp = searchNotFound.parentNode;
const mainCard = document.querySelector('.insights__card.insights__card--main');


const searchСomponents = {
	form: searchForm,
	input: searchInput,
	cross: searchCross,
	items: searchItems,
	notFound: searchNotFound,
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
		// eslint-disable-next-line no-undef
		if (!!mainContent && !!mainCard && window.innerWidth > breakpointXL) {
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
	function noSubmit(event) {
		event.stopImmediatePropagation();
		event.preventDefault();
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
				// eslint-disable-next-line no-param-reassign
				item.style.display = 'block';
				const str = title.textContent;
				const strStart = title.textContent.toLowerCase().indexOf(this.value.toLowerCase());
				const strEnd = strStart + this.value.length;
				title.innerHTML = str.replace(`${str.slice(strStart, strEnd)}`, `<span class="search-value">${str.slice(strStart, strEnd)}</span>`);
			} else {
				// eslint-disable-next-line no-param-reassign
				item.style.display = 'none';
			}
		});
		showNotFound();
	}
	this.form.addEventListener('submit', (event) => { noSubmit(event); });
	this.input.addEventListener('input', () => { search.call(searchСomponents); });
	this.cross.addEventListener('click', () => {
		searchInput.value = '';
		search.call(searchСomponents);
	});
}

const selectCls = 'search__select';

const select = document.querySelector(`.${selectCls}`);
const selectBtnText = document.querySelector(`.${selectCls}-btn`);

function openSelect(event) {
	if (event.target.closest(`.${selectCls}`)) {
		select.classList.toggle('js--active');
	} else {
		select.classList.remove('js--active');
	}
}
// eslint-disable-next-line no-unused-vars
function changeSelectText(btn) {
	selectBtnText.firstChild.textContent = btn.firstChild.textContent;
}

window.addEventListener('click', (event) => { openSelect(event); });
window.addEventListener('resize', () => { select.classList.remove('js--active'); });

searchInit.call(searchСomponents);

// eslint-disable-next-line
const tabs = new KisTabs({
	tabSelector: '[data-tabs="tab"]',
	btnSelector: '[data-tabs="btn"]',
	searchActions: true,
});

tabs.init();
