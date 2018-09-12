const validator = require('validator');
const isempty = require('../utils/isempty')


module.exports = function login(data) {
    let errors = {};
    if (isempty(data.email)) {
        errors.email = "email pustoi";
    }
    if (isempty(data.password)) {
        errors.password = "Parol pustoi";
    }

    return errors
}