import { LocalStorageService } from '../shared/ls-service';

export const setUserInfo = () => {
    const photo = document.querySelector('.header__profile-photo');
    const dropdownMenuButton = document.getElementById('dropdownMenuButton');
    const userName = `${LocalStorageService.getPersonalData().firstName} ${LocalStorageService.getPersonalData().lastName}`;
    const userPhotoUrl = LocalStorageService.getPersonalData().photo
    photo.style.backgroundImage = userPhotoUrl ?
        `url("${LocalStorageService.getPersonalData().photo}")` : `url("/src/shared/assets/images.png")`;
    dropdownMenuButton.innerHTML = userName;
}
