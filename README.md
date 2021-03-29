# custom_select
creating styleless select via vanilla js

API

Create new custom select by simply calling:  
let mySel = new CustomSelect('class', options);    

options {  
  hideSelect: true/false // Default is true. Determens whether you want to hide <select> element from page  
  afterInit: function(el) {} // Callback function that is called after creating custom select. Called for each individual select found on page  
}
