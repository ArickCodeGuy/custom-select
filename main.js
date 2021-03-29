'use strict';
class CustomSelect {
  constructor(el, options) {
    this.el = document.querySelectorAll(el);
    this.options = options;
    this.setOptions();
    this.init();
  }

  setOptions() {
    this.options === undefined ? this.options = {}: false;
    this.options.hideSelect === undefined ? this.options.hideSelect = true: false;
  }

  create(el) {
    let selectEl = el.querySelector('select');

    this.options.hideSelect ? selectEl.style.display = 'none': false;

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

    let placeholder = document.createElement('div');
    placeholder.innerHTML = selectEl.querySelector(`option:nth-child(${selectEl.selectedIndex + 1})`).innerHTML;
    placeholder.classList.add('custom-select-placeholder');

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

        optionsContainer.querySelector('.active').classList.remove('active');
        e.target.classList.add('active')
      });
    });
  }

  init() {
    if (this.el) {
      this.el.forEach((el) => {
        this.create(el);
        this.addEvents(el);
      });
    };
  }
};

let mySel = new CustomSelect('.custom-select', {
  hideSelect: false
});