import { renderPosts, postFormHandler } from './dom-handlers/postRender';
import { routes, paths } from './shared/constants/routes';
import './styles/style.scss';
import { signInHandler } from './components/sign-in/sign-in';
import { LocalStorageService } from './shared/ls-service';
import { logoutBtnHandler, profileHandler } from './components/profile/profile';
import { signUpHandler } from './components/sign-up/sign-up';

window.onload = () => {
    const pathName = Object.values(paths).find( path => (path === window.location.pathname));
    const spiner = document.querySelector('.wrapperSpiner');
    spiner.style.display = 'none';

    switch (pathName) {
        case paths.home:

            const token = LocalStorageService.getToken();

            if (!token) {
                window.location.href = routes.sign_in;
            } else {
                renderPosts();
                postFormHandler();
                logoutBtnHandler();
            }

            break;

        case paths.sign_in:
            signInHandler();
            break;

        case paths.sign_up:
            signUpHandler();
            break;

        case paths.profile:
            profileHandler();
            break;

        default:
            break;
    }
};
