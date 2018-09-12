const validator = require('validator');
const isempty = require('../utils/isempty');


module.exports = (data) => {
    let errors = {};
    if (isempty(data.text)) {
        errors.text = "Text pustoi";
    }
    else if(!validator.isLength(data.text, {min: 10})){
        errors.text = 'Text malenky';
    }


    if (!data.blogid) {
        errors.blogid = "Blog pustoi";
    }
    return errors;
};