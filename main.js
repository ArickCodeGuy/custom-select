'use strict';
let defaults = {
  hideSelect: true,
  init: true,
  multipleSelect: false,
};

class CustomSelect {
  constructor(el, options) {
    this.el = el;
    this.options = {...defaults};
    this.setOptions(options);
    this.options.init ? this.init(): false;
  }

  setOptions(options) {
    if (options) {
      for (let option in options) {
        this.options[option] = options[option];
      };
      return 'options set to your options obj'
    }else {
      return 'options set to default options'
    }
  }

  createOptions(el) {
    let selectEl = el.querySelector('select');
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

  createPlaceholder(el) {
    let selectEl = el.querySelector('select');
    let placeholder = document.createElement('div');
    placeholder.innerHTML = selectEl.querySelector(`option:nth-child(${selectEl.selectedIndex + 1})`).innerHTML;
    placeholder.classList.add('custom-select-placeholder');
    return placeholder
  }

  create(el) {
    let selectEl = el.querySelector('select');
    if (!selectEl) {
      throw `CustomSelect Err: No <select> tag found within ${this.el} element`
    };
    this.options.hideSelect ? selectEl.style.display = 'none': false;

    let optionsEl = this.createOptions(el);

    let placeholder = this.createPlaceholder(el);

    let newSelectEl = document.createElement('div');
    newSelectEl.classList.add('custom-select-select');
    newSelectEl.insertAdjacentElement('afterbegin', placeholder);
    newSelectEl.insertAdjacentElement('beforeend', optionsEl);

    el.insertAdjacentElement('beforeend', newSelectEl);
  }

  toggleOptions(el) {
    el.classList.toggle('options-toggled');
    let optionsEl = el.querySelector('.custom-select-options');
    optionsEl.classList.toggle('toggled');
    optionsEl.style.display === 'none' ? optionsEl.style.display = 'block': optionsEl.style.display = 'none';
  }

  addEvents(el) {
    let optionsEl = el.querySelector('.custom-select-options');
    let placeholder = el.querySelector('.custom-select-placeholder');
    placeholder.addEventListener('click', () => {
      this.toggleOptions(el);
    });

    let realSelect = el.querySelector('select');
    let options = el.querySelectorAll('.custom-select-option:not(.disabled)');
    options.forEach((option) => {
      option.addEventListener('click', (e) => {
        placeholder.innerHTML = option.innerHTML;
        this.toggleOptions(el);
        realSelect.value = option.dataset.value;

        optionsEl.querySelector('.selected').classList.remove('selected');
        e.target.classList.add('selected');
      });
    });
  }

  afterInitFunc(el) {
    typeof this.options.afterInit === 'function' ? this.options.afterInit(): false;
  }

  initSingleElement(el) {
    this.create(el);
    this.addEvents(el);
    this.afterInitFunc(el);
    el.classList.add('custom-select-initialized');
  }

  initArray(arr) {
    arr.forEach((el) => this.initSingleElement(el));
  }

  init() {
    // if string is specified
    if (typeof this.el === 'string') {
      let el = document.querySelectorAll(this.el);
      el ? this.initArray(el): false;
    };

    // if NodeList is specified
    NodeList.prototype.isPrototypeOf(this.el) ? this.initArray(this.el): false;;

    // if HTMLElement is specified
    HTMLElement.prototype.isPrototypeOf(this.el) ? this.initSingleElement(this.el): false;
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
    // if string is specified
    if (typeof this.el === 'string') {
      let el = document.querySelectorAll(this.el);
      el ? this.destroyArray(el): false;
    };

    // if NodeList is specified
    NodeList.prototype.isPrototypeOf(this.el) ? this.destroyArray(this.el): false;;

    // if HTMLElement is specified
    HTMLElement.prototype.isPrototypeOf(this.el) ? this.destroySingleElement(this.el): false;
  }
};
