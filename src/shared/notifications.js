// export const showErrorNotification = error => {
//     const notification = document.createElement('div');
//     const body = document.getElementsByTagName('body')[0];
//     notification.innerText = error.response ? error.response.data.error.message : error.message;
//     notification.className = 'error_notification';
//     body.append(notification);
//     setTimeout(() => notification.remove(), 5000)
// };

// export const showSuccessNotification = result => {
//     const notification =document.createElement('div');
//     const body = document.getElementsByTagName('body')[0];
//     notification.className = 'success_notification';
//     notification.innerText = result;
//     body.append(notification);
//     setTimeout(() => notification.remove(), 5000);
// };

export const showNotification = (result, isSuccess) => {
    const notification = document.createElement('div');
    const body = document.getElementsByTagName('body')[0];

    if (isSuccess) {
        notification.className = 'success_notification';
        notification.innerText = result;
    } else {
        notification.innerText = result.response ? result.response.data.error.message : result.message;
        notification.className = 'error_notification';
    }

    body.append(notification);
    setTimeout(() => notification.remove(), 5000);
}
