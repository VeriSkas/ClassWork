import { signIn, passwordRecovery } from '../../api-handlers';
import { passwordLengthValidator, emailLengthValidator } from '../../shared/validators';
import { showNotification } from '../../shared/notifications';
import { showErrorMessage, hideErrorMessage } from '../../shared/constants/error_handlers';
import { ERROR_MESSAGES } from '../../shared/constants/error-messages';

export const signInHandler = () => {
    const signInForm = document.querySelector('.signIn_form');
    const signInBtn = document.getElementById('signInBtn');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const recoverEmailInput = document.getElementById('recoverEmailInput');
    const recoverBtn = document.getElementById('recoverBtn');

    const formFields = {
        email: {
            isValid: true
        },
        password: {
            isValid: false
        }
    }

    signInBtn.setAttribute('disabled', true);
    recoverBtn.setAttribute('disabled', true);

    signInForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        signIn(email, password).catch(error => showNotification(error, false))
    });

    const checkFormValid = () => {
        const isFormValid = Object.values(formFields).every(value => value.isValid );
        isFormValid ? signInBtn.removeAttribute('disabled') : signInBtn.setAttribute('disabled', true);
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

    //onfocus - когда поле в фокусе

    emailInput.onblur = () => {   //когда вне фокуса поле
        !emailLengthValidator(emailInput.value) ?
            showErrorMessage('emailError', ERROR_MESSAGES.email) :
            hideErrorMessage('emailError');
    };

    recoverEmailInput.oninput = () => {
        if (emailLengthValidator( recoverEmailInput.value)) {
            hideErrorMessage('recoverEmailError');
            recoverEmailInput.classList.remove('invalid');
            recoverBtn.removeAttribute('disabled');
        } else {
            recoverEmailInput.classList.add('invalid');
            recoverBtn.setAttribute('disabled', true);
        };

        checkFormValid();
    };

    recoverEmailInput.onblur = () => {
        !emailLengthValidator(emailInput.value) ?
            showErrorMessage('recoverEmailError', ERROR_MESSAGES.email) :
            hideErrorMessage('recoverEmailError');
    };

    recoverBtn.onclick = () => {
        passwordRecovery(recoverEmailInput.value);
    }

    passwordInput.oninput = () => {
        if (passwordLengthValidator( passwordInput.value)) {
            formFields.password.isValid = true;
            hideErrorMessage('passwordLengthError');
            passwordInput.classList.remove('invalid');
        } else {
            formFields.password.isValid = false;
            passwordInput.classList.add('invalid');
        };
        checkFormValid();
    };

    passwordInput.onblur = () => {   //когда вне фокуса поле
        !passwordLengthValidator( passwordInput.value) ?
            showErrorMessage('passwordLengthError', ERROR_MESSAGES.password_length) :
            hideErrorMessage('passwordLengthError');
    };
};

