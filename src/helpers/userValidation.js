export const validateString = (str, minLength, maxLength) => {
    if (minLength && str.length < minLength) {
        return false;
    } else if (maxLength && str.length > maxLength) {
        return false;
    }

    return true;
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePreferences = (preferences) => {
    if (typeof preferences !== "object" || Array.isArray(preferences) || preferences === null) {
        return false
    }

    return true
}

export const validatePassword = (
password,
minLenght,
maxLength,
needsUppercase,
needsNumber
) => {
    if (minLenght && password.length < minLenght) {
        return false;
    } else if (maxLength && password.length > maxLength) {
        return false;
    } else if (needsUppercase && !/[A-Z]/.test(password)) return false;
    else if (needsNumber && !/\d/.test(password)) return false;

    return true;
};

export const validateLoginUser = (body) => {
    const errors = {};

    const { email, password } = body;

    if (!email || !validateEmail(email)) errors.emailError = "Email invalido.";
    if (!password || !validatePassword(password, 7, null, true, true)) errors.passwordError = "Contraseña invalida.";


    return errors;
};

export const validateRegisterUser = (body) => {
    const { name, email, password, repeatPassword } = body;

    const errors = {};

    if (!name || !validateString(name, 4, 20)) errors.nameError = "Nombre invalido, debe contener de 4 a 20 caracteres."
    if (!email || !validateEmail(email)) errors.emailError = "Email invalido."
    if (!password || !validatePassword(password, 7, null, true, true)) errors.passwordError = "Contraseña invalida. Debe tener al menos 7 carcteres, una mayuscula y un numero."
    if (!repeatPassword || repeatPassword != password) errors.repeatPasswordError = "Asegure que las contraseñas sean iguales."

    return errors;
};