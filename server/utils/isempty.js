module.exports = (data) => {
    if (data == undefined || data == null || JSON.stringify(data) == JSON.stringify({}) || data == "") {
        return true;
    }
    else {
        return false;
    }
}