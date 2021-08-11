export const showErrorMessage = (id, message) => {
    const errorTag = document.getElementById(id);
    errorTag.style.display = 'block';
    errorTag.innerText = message;
}

export const hideErrorMessage = id => {
    const errorTag = document.getElementById(id);
    errorTag.style.display = 'none';
}
