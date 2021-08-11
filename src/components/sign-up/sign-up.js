import { signUp } from '../../api-handlers';
import {
    passwordStraengthController,
    emailLengthValidator,
    nameValidator,
    birthDateValidator
} from '../../shared/validators';
import {  showErrorMessage, hideErrorMessage } from '../../shared/constants/error_handlers';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

export const signUpHandler = () => {
    const signUpForm = document.querySelector('.signUn_form');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    const signUpBtn = document.getElementById('signUpBtn');
    const emailInput = document.getElementById('email');
    const userNameInput = document.getElementById('userName');
    const userSurnameInput = document.getElementById('surname');
    const birthInput = document.getElementById('birth');

    const formFields = {
        name: {
            isValid: false
        },
        surname: {
            isValid: false
        },
        birth: {
            isValid: false
        },
        email: {
            isValid: false
        },
        password1: {
            isValid: false
        },
        password2: {
            isValid: false
        }
    };

    signUpBtn.setAttribute('disabled', true);

    userNameInput.oninput = () => {
        if(nameValidator(userNameInput.value)) {
            formFields.name.isValid = true;
            hideErrorMessage('userNameError');
            userNameInput.classList.remove('invalid');
        } else {
            formFields.name.isValid = false;
            userNameInput.classList.add('invalid');
        };

        checkFormValid();
    };

    userNameInput.onblur = ()=> {
        !nameValidator(userNameInput.value) ?
            showErrorMessage('userNameError', ERROR_MESSAGES.userName) :
            hideErrorMessage('userNameError');
    };

    userSurnameInput.oninput = () => {
        if(nameValidator(userSurnameInput.value)) {
            formFields.surname.isValid = true;
            hideErrorMessage('userSurnameError');
            userSurnameInput.classList.remove('invalid');
        } else {
            formFields.surname.isValid = false;
            userSurnameInput.classList.add('invalid');
        };

        checkFormValid();
    };

    userSurnameInput.onblur = ()=> {
        !nameValidator(userSurnameInput.value) ?
            showErrorMessage('userSurnameError', ERROR_MESSAGES.userSurname) :
            hideErrorMessage('userSurnameError');
    };

    emailInput.oninput = () => {
        if (emailLengthValidator( emailInput.value)) {
            formFields.email.isValid = true;
            hideErrorMessage('emailError');
            emailInput.classList.remove('invalid');
        } else {
            formFields.email.isValid = false;
            emailInput.classList.add('invalid');
        };
        checkFormValid();
    };

    emailInput.onblur = () => {
        !emailLengthValidator(emailInput.value) ?
            showErrorMessage('emailError', ERROR_MESSAGES.email) :
            hideErrorMessage('emailError');
    };

    birthInput.oninput = () => {
        if (birthDateValidator(birthInput.value)) {
            formFields.birth.isValid = true;
            hideErrorMessage('birthError');
        } else {
        formFields.birth.isValid = false;
        showErrorMessage('birthError', ERROR_MESSAGES.birth);
        }

        checkFormValid();
    };

    password1.oninput = () => {
       formFields.password1.isValid = passwordStraengthController(password1.value);
       checkFormValid();
    };

    password2.oninput = () => {
        formFields.password2.isValid = formFields.password1.isValid && (password1.value === password2.value);

        if(formFields.password1.isValid && (password1.value === password2.value)) {
            formFields.password2.isValid = true;
            hideErrorMessage('passwordCompareError');
        } else {
            formFields.password2.isValid = false;
        }

        checkFormValid();
    }

    password2.onblur = ()=> {
        password1.value !== password2.value ?
            showErrorMessage('passwordCompareError', ERROR_MESSAGES.passwordsCompare) :
            hideErrorMessage('passwordCompareError');
    };


    const checkFormValid = () => {
        console.log(formFields);
        const isFormValid = Object.values(formFields).every(value => value.isValid );
        isFormValid ? signUpBtn.removeAttribute('disabled') : signUpBtn.setAttribute('disabled', true);
    };

    signUpForm.addEventListener('submit', event => {
        event.preventDefault();

        const user = {
            firstName: userNameInput.value,
            lastName: userSurnameInput.value,
            email: emailInput.value,
            birth: birthInput.value,
            password: password1.value

        }
        signUp(user);
    });
};
