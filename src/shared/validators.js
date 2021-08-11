import moment from 'moment';

import { REGEXP } from './constants/regexp';
import { PASSWORD_STRENGTHS, validationMessages } from './constants/common';

export  const passwordLengthValidator = password => password.match(REGEXP.PASSWORD_LENGTH);

export  const emailLengthValidator = email => email.match(REGEXP.EMAIL_LENGTH);

export const nameValidator = username => username.match(REGEXP.NAME);

export const birthDateValidator = birth => {
    const currentDate =  moment();
    const comparingDate = moment(birth);
    const isAdult = currentDate.diff(comparingDate, 'years', true) >= 18;
    return isAdult;
};

const validationStatus = document.querySelector('.signUn_form_password-strength-status-current');
const validationInfoLowercase = document.querySelector('.signUn_form_password-strength-status-info-lowercase');
const validationInfoUppercase = document.querySelector('.signUn_form_password-strength-status-info-uppercase');
const validationInfoNumbers = document.querySelector('.signUn_form_password-strength-status-info-numbers');
const validationInfoCharacters = document.querySelector('.signUn_form_password-strength-status-info-characters');

const lowerCaseCheck = password => {
    const result = REGEXP.LOVER_CASE.test(password);
    validationInfoLowercase.innerText = validationMessages.lowercase;
    result ? validationInfoLowercase.style.color = 'blue' : validationInfoLowercase.style.color = 'grey';
    return result;
};
const upperCaseCheck = password => {
    const result = REGEXP.UPPER_CASE.test(password);
    validationInfoUppercase.innerText = validationMessages.uppercase;
    result ? validationInfoUppercase.style.color = 'blue' : validationInfoUppercase.style.color = 'grey';
    return result;
};
const numberCheck = password => {
    const result = REGEXP.NUMBERS.test(password);
    validationInfoNumbers.innerText = validationMessages.numbers;
    result ? validationInfoNumbers.style.color = 'blue' : validationInfoNumbers.style.color = 'grey';
    return result;
};
const eightCharactersCheck = password => {
    const result = REGEXP.EIGHT_CHARACTERS.test(password);
    validationInfoCharacters.innerText = validationMessages.characters;
    result ? validationInfoCharacters.style.color = 'blue' : validationInfoCharacters.style.color = 'grey';
    return result;
};

export const passwordStraengthController = password => {
    let passwordStrength;
    const filer = document.querySelector('.signUn_form_password-strength-status-filer');
    const passwordStrengthBlock = document.querySelector('.signUn_form_password-strength');
    const passwordStrengthNumber = lowerCaseCheck(password) + upperCaseCheck(password) + numberCheck(password) + eightCharactersCheck(password);

    Object.keys(PASSWORD_STRENGTHS).forEach( item => {
        if (PASSWORD_STRENGTHS[item] === passwordStrengthNumber) {
            passwordStrength = item;
        }
    });

    passwordStrengthBlock.style.display = 'block';

    switch (passwordStrengthNumber) {
        case 1:
            filer.classList.add('weak');
            filer.classList.remove('moderate');
            validationStatus.innerHTML = 'Weak';
            validationStatus.className = 'signUn_form_password-strength-status-current-weak';
            break;
        case 2:
            filer.classList.add('moderate');
            filer.classList.remove('strong');
            validationStatus.innerHTML = 'Moderate';
            validationStatus.className = 'signUn_form_password-strength-status-current-moderate';
            break;
        case 3:
            filer.classList.add('strong');
            filer.classList.remove('veryStrong');
            validationStatus.innerHTML = 'Strong';
            validationStatus.className = 'signUn_form_password-strength-status-current-strong';
            break;
        case 4:
            filer.classList.add('veryStrong');
            validationStatus.innerHTML = 'Complite';
            validationStatus.className = 'signUn_form_password-strength-status-current-complite';
            break;
        default:
            filer.classList.remove('weak');
            break;
    }

    return passwordStrengthNumber === 4;
}
