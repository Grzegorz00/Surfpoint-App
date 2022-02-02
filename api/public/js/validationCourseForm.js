const form = document.querySelector('form');
const trainerSurnameInput = document.getElementById('trainerSurname');
const clientSurnameInput = document.getElementById('clientSurname');
const dateFromInput = document.getElementById('dateFrom');
const dateToInput = document.getElementById('dateTo');

const errorTrainerSurname = document.getElementById('errorTrainerSurname');
const errorClientSurname = document.getElementById('errorClientSurname');
const errorDateFrom = document.getElementById('errorDateFrom');
const errorDateTo = document.getElementById('errorDateTo');
const errorSummary = document.getElementById('errorSummary');

form.addEventListener('submit', e => {
    //  e.preventDefault();
    validateForm();
})


function validateForm() {
    resetErrors([trainerSurnameInput,clientSurnameInput,dateFromInput,dateToInput],[errorTrainerSurname,errorClientSurname,errorDateFrom,errorDateTo]);

   let valid = true;

   if(!checkRequired(trainerSurnameInput.value)){
       valid = false;
       trainerSurnameInput.classList.add("error-input");
       errorTrainerSurname.innerText = "Pole jest wymagane";
   } else if(!checkTextLengthRange(trainerSurnameInput.value, 1, 100)){
       valid = false;
       trainerSurnameInput.classList.add("error-input");
       errorTrainerSurname.innerText = "Pole powinno zawiereać od 1 do 100 znaków";
   }

   if(!checkRequired(clientSurnameInput.value)){
       valid = false;
       clientSurnameInput.classList.add("error-input");
       errorClientSurname.innerText = "Pole jest wymagane";
   } else if(!checkTextLengthRange(clientSurnameInput.value, 1, 100)){
       valid = false;
       clientSurnameInput.classList.add("error-input");
       errorClientSurname.innerText = "Pole powinno zawiereać od 1 do 100 znaków";
   }

   let nowDate = new Date();

   if(!checkRequired(dateFromInput.value)){
       valid = false;
       dateFromInput.classList.add("error-input");
       errorDateFrom.innerText = "Pole jest wymagane";
   } else if(!checkDateIfAfter(dateFromInput.value, Date.now())){
       valid = false;
       dateFromInput.classList.add("error-input");
       errorDateFrom.innerText = "Termin już minął";
   }

   
    if(!checkDateIfAfter(dateToInput, dateFromInput)){
        valid = false;
        dateToInput.classList.add("error-input");
        errorDateTo.innerText = "Termin już minął";
    }

   if(!valid){
    //    errorSummary.innerText = "Formularz zawiera błędy";
        // e.preventDefault();
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

function checkDateIfAfter(value, compareTo){
    if(!value){
        return false;
    }
    if(!compareTo){
        return false;
    }

    if(Date.parse(value) <= compareTo){
        return false;
    }
    return true;
}