import { LocalStorageService } from '../../shared/ls-service';
import { routes } from '../../shared/constants/routes';
import { uploadPhoto } from '../../api-handlers';
import { setUserInfo } from '../../shared/helpers';

export const logoutBtnHandler = () => {
    const logOutBtn = document.querySelector('.logOut-btn');

    logOutBtn.onclick = () => {
        window.location.href = routes.home;
        LocalStorageService.clearStorage()
    };
};

export const profileHandler = () => {
    const photoInput = document.getElementById('photoInput');

    photoInput.oninput = event => {
        const imageName = photoInput.value;
        uploadPhoto(event, imageName)
    }

    setUserInfo();
    logoutBtnHandler();
    formHandler();

}

export const formHandler = () => {
    const { firstName, lastName, email, birth } = LocalStorageService.getPersonalData();
    const userName = document.getElementById('userName');
    const userSurname = document.getElementById('userSurname');
    const emailInput = document.getElementById('email');
    const birthInput = document.getElementById('birth');
    const form = document.querySelector('.profile__form');

    userName.value = firstName;
    userSurname.value = lastName;
    emailInput.value = email;
    birthInput.value = birth;

    form.addEventListener('submit', event => {
        event.preventDefault();
    })

    refreshFormFoto();

}

export const refreshFormFoto = () => {
    const photoBlock = document.querySelector('.profile__form-photo-img');
    const userPhotoUrl = LocalStorageService.getPersonalData().photo
    photoBlock.style.backgroundImage = userPhotoUrl ?
        `url("${LocalStorageService.getPersonalData().photo}")` : `url("/src/shared/assets/images.png")`;
}
