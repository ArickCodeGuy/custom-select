# custom_select
creating styleless select via vanilla js

## Usage

Create new custom select by simply calling:
```javascript
let mySel = new CustomSelect('className', [options]);
```

input
```html
<div class="custom-select">
  <select name="" id="">
    ...
  </select>
</div>
```

output
```html
<div class="custom-select custom-select-initialized">
  <select name="" id="" style="display: none;">
    ...
  </select>
  <div class="custom-select-select">
    <div class="custom-select-placeholder">Selected Option</div>
    <div class="custom-select-options" style="display: none;">
      Options
    </div>
  </div>
</div>
```

## API

options Object
```javascript
options {
  init: true // If you want to specify time when to init custom-select mySel.init()
  hideSelect: true, // Default is true. Determens whether you want to hide <select> element from page
  afterInit: function(el) {}, // Callback function that is called after creating custom select. Called for each individual select found on page
  multipleSelect: false // WIP
}
```

Destroy custom select by calling:
```javascript
mySel.destroy()
```
