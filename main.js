'use strict';
const defaultOptions = {
  hideSelect: true,
  init: true,
  multipleSelect: false,
  hideOnOutsideClick: true,
};

class CustomSelect {
  constructor(el, options) {
    this.el = el;
    this.elements = [];
    this.options = Object.assign({}, defaultOptions, options);
    this.options.init ? this.init(): false;
  }

  createOptions(el, selectEl) {
    let optionElArr = selectEl.querySelectorAll('option');
    let optionsEl = document.createElement('div');

    optionsEl.classList.add('custom-select-options');
    optionsEl.style.display = 'none';
    optionElArr.forEach((el) => {
      let optionEl = document.createElement('div');
      optionEl.classList.add('custom-select-option');
      el.selected ? optionEl.classList.add('selected'): false;
      el.disabled ? optionEl.classList.add('disabled'): false;
      optionEl.innerHTML = el.innerHTML;
      optionEl.dataset.value = el.value;
      optionsEl.insertAdjacentElement('beforeend', optionEl);
    });
    return optionsEl
  }

  createPlaceholder(el, selectEl) {
    let placeholder = document.createElement('div');
    placeholder.innerHTML = selectEl.querySelector(`option:nth-child(${selectEl.selectedIndex + 1})`).innerHTML;
    placeholder.classList.add('custom-select-placeholder');
    return placeholder
  }

  create(el) {
    // Creating custom select elements
    const selectEl = el.querySelector('select');
    const optionsEl = this.createOptions(el, selectEl);
    const optionElArr = optionsEl.querySelectorAll('.custom-select-option');
    const placeholder = this.createPlaceholder(el, selectEl);
    const newSelectEl = document.createElement('div');

    if (!selectEl) {
      throw `CustomSelect Err: No <select> tag found within ${this.el} element`
    };

    this.options.hideSelect ? selectEl.style.display = 'none': false;

    newSelectEl.classList.add('custom-select-select');
    newSelectEl.insertAdjacentElement('afterbegin', placeholder);
    newSelectEl.insertAdjacentElement('beforeend', optionsEl);

    el.insertAdjacentElement('beforeend', newSelectEl);

    // Adding events
    placeholder.addEventListener('click', () => this.toggleOptions(el));

    optionElArr.forEach((optionEl) => {
      optionEl.addEventListener('click', (e) => {
        if (!optionEl.classList.contains('disabled')) {
          placeholder.innerHTML = optionEl.innerHTML;
          this.toggleOptions(el);
          selectEl.value = optionEl.dataset.value;

          optionsEl.querySelector('.selected').classList.remove('selected');
          e.currentTarget.classList.add('selected');
        }
      });
    });

    if (this.options.hideOnOutsideClick) {
      document.addEventListener('click', (e) => {
        if (!e.target === el || !el.contains(e.target)) {
          this.closeOptions(el);
        };
      });
    };
  }

  toggleOptions(el) {
    let optionsEl = el.querySelector('.custom-select-options');

    el.classList.toggle('options-toggled');
    optionsEl.classList.toggle('toggled');
    optionsEl.style.display === 'none' ? optionsEl.style.display = 'block': optionsEl.style.display = 'none';
  }

  closeOptions(el) {
    let optionsEl = el.querySelector('.custom-select-options');

    el.classList.remove('options-toggled');
    optionsEl.classList.remove('toggled');
    optionsEl.style.display = 'none';
  }

  afterInitFunc(el) {
    typeof this.options.afterInit === 'function' ? this.options.afterInit(): false;
  }

  initSingleElement(el) {
    this.create(el);
    this.afterInitFunc(el);
    el.classList.add('custom-select-initialized');
  }

  initArray(arr) {
    arr.forEach((el, i) => this.initSingleElement(el));
  }

  init() {
    if (typeof this.el === 'string') {
      // if string is specified
      const el = document.querySelectorAll(this.el);
      el ? this.initArray(el): false;

    }else if (NodeList.prototype.isPrototypeOf(this.el)) {
      // if NodeList is specified
      this.initArray(this.el);

    }else if (HTMLElement.prototype.isPrototypeOf(this.el)) {
      // if HTMLElement is specified
      this.initSingleElement(this.el);

    }else {
      throw `CustomSelect err: specified el: ${this.el} doesn't match eny allowed type of variable`;
    };
  }

  destroySingleElement(el) {
    let customSelect = el.querySelector('.custom-select-select');
    customSelect.remove();
    el.classList.remove('custom-select-initialized');
    el.classList.remove('options-toggled');
    el.querySelector('select').style.display = 'block';
  }

  destroyArray(arr) {
    arr.forEach((el) => this.destroySingleElement(el));
  }

  destroy() {
    if (typeof this.el === 'string') {
      // if string is specified
      const el = document.querySelectorAll(this.el);
      el ? this.destroyArray(el): false;

    }else if (NodeList.prototype.isPrototypeOf(this.el)) {
      // if NodeList is specified
      this.destroyArray(this.el);

    }else if (HTMLElement.prototype.isPrototypeOf(this.el)) {
      // if HTMLElement is specified
      this.destroySingleElement(this.el);

    }else {
      throw `CustomSelect err: specified el: ${this.el} doesn't match eny allowed type of variable`;
    };
  }
};
