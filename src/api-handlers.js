require('firebase/auth');
import firebase from 'firebase/app';
import 'firebase/storage';
import axios from 'axios';

import {firebaseConfig, databaseURL, authURL} from './api.config';
import { showNotification } from './shared/notifications';
import { LocalStorageService } from './shared/ls-service';
import { routes } from './shared/constants/routes';
import { setUserInfo } from './shared/helpers';
import { refreshFormFoto } from './components/profile/profile';
import { NOTIFICATION } from './shared/constants/common';

const headers = {
    'Content-Type': 'application/json'
};

export const initApi = async () => {
    firebase.initializeApp(firebaseConfig);
};

export const createPost = post => {
    const { userId, name, email, date, title, content } = post;
    return fetch(
        `${databaseURL}/posts.json`,
        {
            method: 'POST',
            headers,
            body: JSON.stringify({
                userId,
                name,
                email,
                date,
                title,
                content,
            })
        }

    )
        .then( response => response.json())
        .catch( error => showNotification(error, false))
};

export const getPosts = () => {
    return fetch(
        `${databaseURL}/posts.json`,
        {
            method: 'GET',  //get запрос идет по умолчанию, его можно не прописывать
            headers,
        }
    )
        .then( response => response.json())
        .then( result => {
            if(result) {
                const tranformedPostsArr = Object.keys(result).map( key => ({
                    ...result[key],
                    id: key
                }))
                return tranformedPostsArr;
            }
        })
        .catch( error => showNotification(error, false));
};

initApi();

export const getUser = () => {
    return axios.get(`${databaseURL}/users.json`)
        .then(response => {
            if(response) {
                const tranformedArr = Object.keys(response.data).map( key => ({
                    ...response.data[key],
                    id: key
                }))
                const user = tranformedArr.find( user => user.uuid === LocalStorageService.getUID());
                LocalStorageService.setPersonalData(user);
            }
        })
}

export const signIn = (email, password) => {
    return axios.post(authURL, {
        email,
        password,
        returnSequreToken: true
    })
    .then(response => {
        if(response) {
            const { idToken: token, localId } = response.data;
            LocalStorageService.setToken(token);
            LocalStorageService.setUID(localId);
            getUser().then(() => window.location.href = routes.home);
        }
    })
}

export const getUsers = () => {
    return axios.get(`${databaseURL}/users.json`)
        .then(response => {
            if(response) {
                return Object.keys(response.data).map( key => ({...response.data[key], id: key}));
            }
        })
}

export const getUserById = id =>  axios.get(`${databaseURL}/users/${id}.json`);

export const createAuthData = ( email, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then( response => {
            const { uid } = response.user;
            LocalStorageService.setUID(uid);
        })
}

export const signUp = async user => {
    const { password, email } = user;

    try {
        await createAuthData( email, password );
        await createUser(user).then(response => LocalStorageService.setUserID(response.data.name));
        await signIn(email, password);
    } catch (error) {
        showNotification(error, false);
    }

}

export const createUser = user => {
    const { firstName, lastName, birth, email } = user;
    return axios.post(`${databaseURL}/users.json`, {
        firstName,
        lastName,
        birth,
        email,
        uuid: LocalStorageService.getUID()
    })
}

export const passwordRecovery = email => {
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => window.location.href = routes.sign_in)
        .catch(error => showNotification(error, false))
}

export const uploadPhoto = async (event, imgName) => {
    const user = LocalStorageService.getPersonalData();
    await firebase
        .storage()
        .ref(`photos/${imgName}`)
        .put(event.target.files[0])
        .catch( error => showNotification(error, false));
    await firebase
        .storage()
        .ref(`photos/${imgName}`)
        .getDownloadURL()
        .then( url => user.photo = url)
        .catch( error => showNotification(error, false));
    await updateUser(user)
        .then( () => refreshFormFoto())
        .catch( error => showNotification(error, false));

    setTimeout( () => showNotification(NOTIFICATION.upload_successfull, true), 1000)
    // await firebase.storage().ref(`photos/${imgName}`).delete
}

export const updateUser = async user => {
    return axios.put(`${databaseURL}/users/${user.id}.json`, user)
        .then( () => {
            LocalStorageService.setPersonalData(user);
            setUserInfo();
            showNotification(NOTIFICATION.update_user, true)
        })
        .catch(error => showNotification(error, false))
}
