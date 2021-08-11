export const REGEXP = {
    PASSWORD_LENGTH: /^.{8,}$/,
    EMAIL_LENGTH: /^[a-z0-9.\-_+]+@[a-z0-9\-_+]+\.[a-z0-9.\-+]{2,6}$/i,
    UPPER_CASE: /(?=.*[A-Z])/,
    LOVER_CASE: /(?=.*[a-z])/,
    NUMBERS: /(?=.*\d)/,
    EIGHT_CHARACTERS: /[a-zA-Z\d@$#!%?&*^()-=+_]{8,}/,
    NAME: /^[a-zа-я]{3,32}$/i,
};
