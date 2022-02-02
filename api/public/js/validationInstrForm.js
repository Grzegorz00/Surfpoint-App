const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const sportInput = document.getElementById('sport');
const priceInput = document.getElementById('price');

const errorName = document.getElementById('errorName');
const errorSurname = document.getElementById('errorSurname');
const errorSport = document.getElementById('errorSport');
const errorPrice = document.getElementById('errorPrice');
const errorSummary = document.getElementById('errorSummary');

form.addEventListener('submit', e => {
    //  e.preventDefault();
    validateForm();
})


function validateForm() {
    resetErrors([nameInput,surnameInput,sportInput,priceInput],[errorName,errorSurname,errorSport,errorPrice]);

   let valid = true;

   if(!checkRequired(nameInput.value)){
       valid = false;
       nameInput.classList.add("error-input");
       errorName.innerText = "Pole jest wymagane";
   } else if(!checkTextLengthRange(nameInput.value, 1, 100)){
       valid = false;
       nameInput.classList.add("error-input");
       errorName.innerText = "Pole powinno zawiereać od 1 do 100 znaków";
   }

   if(!checkRequired(surnameInput.value)){
       valid = false;
       surnameInput.classList.add("error-input");
       errorSurname.innerText = "Pole jest wymagane";
   } else if(!checkTextLengthRange(surnameInput.value, 1, 100)){
       valid = false;
       surnameInput.classList.add("error-input");
       errorSurname.innerText = "Pole powinno zawiereać od 1 do 100 znaków";
   }
   
   if(!checkRequired(sportInput.value)){
       valid = false;
       sportInput.classList.add("error-input");
       errorSport.innerText = "Pole jest wymagane";
   } else if(!checkTextLengthRange(sportInput.value, 1, 100)){
       valid = false;
       sportInput.classList.add("error-input");
       errorSport.innerText = "Pole powinno zawiereać od 1 do 100 znaków";
   }

   if(!checkRequired(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
    } else if(!checkIfNumber(priceInput.value)){
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole powinno być liczbą";
    }

   if(!valid){
    //    errorSummary.innerText = "Formularz zawiera błędy";
    //     e.preventDefault();
    //  resetErrors([nameInput,surnameInput,sportInput,priceInput],[errorName,errorSurname,errorSport,errorPrice]);
  }
    // resetErrors([nameInput,surnameInput,sportInput,priceInput],[errorName,errorSurname,errorSport,errorPrice]);


   return valid;
}

function resetErrors(inputs, errorTexts, errorInfo){
    for(let i=0; i<inputs.length; i++){
        inputs[i].classList.remove("error-input");
    }

    for(let i=0; i<inputs.length; i++){
        errorTexts[i].innerText = "";
    }

    // errorInfo.innerText = "";
}

function checkRequired(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    if(value === ""){
        return false;
    }

    return true;
}

function checkTextLengthRange(value, min, max){
    if(!value){
        return false;
    }
    
    value = value.toString().trim();
    const length = value.length;
    if(max && length > max) {
        return false;
    }

    if(min && length < min) {
        return false;
    }
    return true;
}

function checkIfNumber(value){
    if(!value){
        return false;
    }
    if(isNaN(value) || value <= 0){
        return false;
    }
    return true;
}