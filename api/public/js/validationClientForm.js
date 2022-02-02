const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const ageInput = document.getElementById('age');
const phoneNumberInput = document.getElementById('number');

const errorName = document.getElementById('errorName');
const errorSurname = document.getElementById('errorSurname');
const errorAge = document.getElementById('errorAge');
const errorPhoneNumber = document.getElementById('errorPhoneNumber');
const errorSummary = document.getElementById('errorSummary');

form.addEventListener('submit', e => {
    //  e.preventDefault();
    validateForm();
})


function validateForm() {
    resetErrors([nameInput,surnameInput,ageInput,phoneNumberInput],[errorName,errorSurname,errorAge,errorPhoneNumber]);

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
   
   if(!checkRequired(ageInput.value)){
       valid = false;
       ageInput.classList.add("error-input");
       errorAge.innerText = "Pole jest wymagane";
   } else if(!checkIfNumber(ageInput.value)){
       valid = false;
       ageInput.classList.add("error-input");
       errorAge.innerText = "Pole powinno być liczbą";
   }

   if(!checkRequired(phoneNumberInput.value)){
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole jest wymagane";
    } else if(!checkTextLengthRange(phoneNumberInput.value,9,9)){
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole powinno składać się z 9 cyfr";
    } else if(!checkIfNumber(phoneNumberInput.value)){
        valid = false;
        phoneNumberInput.classList.add("error-input");
        errorPhoneNumber.innerText = "Pole powinno składać się wyłącznie z cyfr";
    }

   if(!valid){
    //    errorSummary.innerText = "Formularz zawiera błędy";
        // e.preventDefault();
    //  resetErrors([nameInput,surnameInput,ageInput,phoneNumberInput],[errorName,errorSurname,errorAge,errorPhoneNumber]);
  }
    // resetErrors([nameInput,surnameInput,ageInput,phoneNumberInput],[errorName,errorSurname,errorAge,errorPhoneNumber]);


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