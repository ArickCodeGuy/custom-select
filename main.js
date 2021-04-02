'use strict';
let defaults = {
  hideSelect: true,
  init: true,
  multipleSelect: false,
};

class CustomSelect {
  constructor(el, options) {
    this.el = el;
    this.options = defaults;
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
      this.init();
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

  init() {
    let el = document.querySelectorAll(this.el);
    if (el) {
      el.forEach((el) => {
        this.create(el);
        this.addEvents(el);
        this.afterInitFunc(el);
        el.classList.add('custom-select-initialized');
      });
    };
    return `Initialized: ${this.el}`
  }

  destroy() {
    let el = document.querySelectorAll(this.el);
    if (el) {
      el.forEach((el) => {
        let customSelect = el.querySelector('.custom-select-select');
        customSelect.remove();
        el.className = '';
        el.classList.add('custom-select');
      });
    };
  }
};