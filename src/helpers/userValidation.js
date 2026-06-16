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

    if (!email || !validateEmail(email)) errors.email = "Email invalido.";
    if (!password || !validatePassword(password, 7, null, true, true)) errors.password = "Contraseña invalida.";


    return result;
};

export const validateRegisterUser = (body) => {
    const { name, email, password, repeatPassword } = body;

    const errors = {};

    if (!name || !validateString(name, 4, 20)) errors.name = "Nombre invalido, debe contener de 4 a 20 caracteres."
    if (!email || !validateEmail(email)) errors.email = "Email invalido."
    if (!password || !validatePassword(password, 7, null, true, true)) errors.password = "Contraseña invalida. Debe tener al menos 7 carcteres, una mayuscula y un numero."
    if (!repeatPassword || repeatPassword != password) errors.repeatPassword = "Asegure que las contraseñas sean iguales."

    return errors;
};