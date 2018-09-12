const validator = require('validator');
const isempty = require('../utils/isempty')


module.exports = function register(data) {
    let errors = {};
    if (isempty(data.email)) {
        errors.email = "email pustoi";
    }
    else if(!validator.isEmail(data.email)){
        errors.title = 'Ne to che to s email';
    }

    if (isempty(data.name)) {
        errors.name = "Imya pustoi";
    }
    else if(!validator.isLength(data.name, {max: 40})){
        errors.name = 'Imya che to ne to';
    }

    if (isempty(data.password)) {
        errors.password = "Parol pustoi";
    }
    else if(!validator.isLength(data.password, {min: 6, max:40})){
        errors.password = 'Parol che to ne to';
    }

    return errors
}