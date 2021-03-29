'use strict';
class CustomSelect {
  constructor(el, options) {
    this.el = el;
    this.options = options;
    this.setOptions();
  }

  setOptions() {
    if (this.options) {
      this.options.hideSelect === undefined ? this.options.hideSelect = true: false;
      this.options.init === undefined ? this.options.init = true: false;
      
      this.options.init ? this.init(): false;
    }else {
      this.init();
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
    el.style.display === 'none' ? el.style.display = 'block': el.style.display = 'none';
  }

  addEvents(el) {
    let optionsContainer = el.querySelector('.custom-select-options');
    let placeholder = el.querySelector('.custom-select-placeholder');
    placeholder.addEventListener('click', () => {
      this.toggleOptions(optionsContainer);
    });

    let realSelect = el.querySelector('select');
    let options = el.querySelectorAll('.custom-select-option:not(.disabled)');
    options.forEach((option) => {
      option.addEventListener('click', (e) => {
        placeholder.innerHTML = option.innerHTML;
        this.toggleOptions(optionsContainer);
        realSelect.value = option.dataset.value;

        optionsContainer.querySelector('.selected').classList.remove('selected');
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
        el.classList.remove('custom-select-initialized');
      });
    };
  }
};