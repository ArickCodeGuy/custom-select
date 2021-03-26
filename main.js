'use strict';
class CustomSelect {
  constructor(el) {
    this.el = document.querySelectorAll(el);
    this.init();
  }

  create(elArr) {
    elArr.forEach((el) => {
      let selectEl = el.querySelector('select');

      let options = [];
      let optionsElArr = selectEl.querySelectorAll('option');
      optionsElArr.forEach((el) => {
        options.push({
          value: el.value,
          html: el.innerHTML
        });
      });


      let optionsEl = document.createElement('div');
      optionsEl.classList.add('custom-select-options');
      optionsEl.style.display = 'none';
      options.forEach((option) => {
        let optionEl = document.createElement('div');
        optionEl.classList.add('custom-select-option');
        optionEl.addEventListener('click', function() {

        });
        optionEl.innerHTML = option.html;
        optionEl.dataset.value = option.value;
        optionsEl.insertAdjacentElement('beforeend', optionEl);
      });


      let placeholder = document.createElement('div');
      placeholder.innerHTML = options[0].html;
      placeholder.classList.add('custom-select-placeholder');


      let newSelectEl = document.createElement('div');
      newSelectEl.classList.add('custom-select-select');
      newSelectEl.insertAdjacentElement('afterbegin', placeholder);
      newSelectEl.insertAdjacentElement('beforeend', optionsEl);

      el.insertAdjacentElement('beforeend', newSelectEl);
    })
  }

  toggleOptions(el) {
    if (el.style.display === 'none') {
      el.style.display ='block';
    }else {
      el.style.display = 'none';
    }
  }

  addEvents(elArr) {
    elArr.forEach((el) => {
      let optionsContainer = el.querySelector('.custom-select-options');
      let placeholder = el.querySelector('.custom-select-placeholder');
      placeholder.addEventListener('click', () => {
        this.toggleOptions(optionsContainer);
      });

      let realSelect = el.querySelector('select');
      let options = el.querySelectorAll('.custom-select-option');
      options.forEach((option) => {
        option.addEventListener('click', () => {
          placeholder.innerHTML = option.innerHTML;
          this.toggleOptions(optionsContainer);
          realSelect.value = option.dataset.value;
        })
      })
    });
  }

  init() {
    this.create(this.el);
    this.addEvents(this.el);
  }
};

let mySel = new CustomSelect('.custom-select');