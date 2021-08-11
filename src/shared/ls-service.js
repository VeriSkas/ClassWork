export class LocalStorageService {
    static getToken() {
        return localStorage.getItem('token');
    }

    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static setPersonalData(user) {
        localStorage.setItem('PersonalData',JSON.stringify(user));
    }

    static getPersonalData() {
        return JSON.parse(localStorage.getItem('PersonalData'));
    }

    static getUID() {
        return localStorage.getItem('uid');
    }

    static setUserID(id) {
        localStorage.setItem('userID', id);
    }

    static getUserID() {
        return localStorage.getItem('userID');
    }

    static setUID(id) {
        localStorage.setItem('uid', id);
    }

    static clearStorage() {
        localStorage.clear();
    }
}
