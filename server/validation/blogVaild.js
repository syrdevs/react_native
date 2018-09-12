const validator = require('validator');
const isempty = require('../utils/isempty');


module.exports.createblog = (data, file) => {
    let errors = {};
    if (isempty(data.title)) {
        errors.title = "Title pustoi";
    }
    else if(!validator.isLength(data.title, {min: 10})){
        errors.title = 'Title malenky';
    }

    if (isempty(data.description)) {
        errors.description = "Title pustoi";
    }
    else if(!validator.isLength(data.description, {min: 10})){
        errors.description = 'Title malenky';
    }


    if (isempty(file)) {
        errors.image = "Images is required";
    }
    else if (isempty(file.filename)) {
        errors.image = "Images is required"
    }

    return errors;
};


module.exports.editblog = (data) => {
    let errors = {};
    if (isempty(data.title)) {
        errors.title = "Title pustoi";
    }
    else if(!validator.isLength(data.title, {min: 10})){
        errors.title = 'Title malenky';
    }

    if (isempty(data.description)) {
        errors.description = "Title pustoi";
    }
    else if(!validator.isLength(data.description, {min: 10})){
        errors.description = 'Title malenky';
    }

    return errors;
};