const showInputError = (popupForm, inputElement, errorMessage, config) => {
    const errorElement = popupForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.classList.add(config.errorActiveClass);
    errorElement.textContent = errorMessage;

}

const hideInputError = (popupForm, inputElement, config) => {
    const errorElement = popupForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorActiveClass);
    errorElement.textContent = '';
};

const checkInputValidity = (popupForm, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(popupForm, inputElement, inputElement.validationMessage, config);
    }
    else {
        hideInputError(popupForm, inputElement, config)
    };
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled')
    }
    else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', 'disabled')
    }
}

function setEventListeners(popupForm, config) {
    const inputList = Array.from(popupForm.querySelectorAll(config.inputSelector));
    const buttonElement = popupForm.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(popupForm, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        })

    })
}

function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((popupForm) => {
        popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(popupForm, config);
    })
}


