# custom_select
creating styleless select via vanilla js

API

Create new custom select by simply calling:  
let mySel = new CustomSelect('className', options); 

options {  <br />
&nbsp;&nbsp;hideSelect: true/false // Default is true. Determens whether you want to hide \<select\> element from page  <br />
&nbsp;&nbsp;afterInit: function(el) {} // Callback function that is called after creating custom select. Called for each individual select found on page  <br />
}
