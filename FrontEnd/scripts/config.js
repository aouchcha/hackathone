function setupMessageClose(messageElement, duration = 3000) {
    const closeTimeout = setTimeout(() => {
        messageElement.remove()
        clearTimeout(closeTimeout)
    }, duration)
}

function showError(message) {
    const errorMessage = document.createElement('dv')
    errorMessage.id = 'errorMessage'
    errorMessage.textContent = message;
    document.body.appendChild(errorMessage)
    setupMessageClose(errorMessage);
}

function showSuccess(message) {
    const successMessage = document.createElement('dv')
    successMessage.id = 'successMessage'
    successMessage.textContent = message;
    document.body.appendChild(successMessage)
    setupMessageClose(successMessage);
}


export { setupMessageClose, showError, showSuccess }