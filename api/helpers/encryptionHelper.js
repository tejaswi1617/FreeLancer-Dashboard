const bcrypt = require('bcrypt');
const salt = "$2b$10$wWcWzH8u0Kiol1l.1yLjmO";

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, salt);
};

const comparePassword = (password,encryptedPasswordToCompareTo) => {
    let encryptedPassword = encryptPassword(password, salt);
    return encryptedPassword === encryptedPasswordToCompareTo
};

const generatePassword = () => {
    let length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};

module.exports = {
    encryptPassword,
    comparePassword,
    generatePassword,
};