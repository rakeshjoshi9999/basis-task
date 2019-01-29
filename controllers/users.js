var status = require('../config/status');
const userService = require('../services');

let getUser = (criteria, callback) => {
    userService.userService.getUser(criteria, (err, user) => {
        if (err) {
            callback(err)
        } else {
            callback(null, user);
        }
    })
}

let userSignup = (data, callback) => {
    let criteria = { username: data.username };
    userService.userService.getUser(criteria, (err, user) => {
        if (err) {
            callback(err);
        } else if (user) {
            callback(null, false);
        } else {
            userService.userService.addUser(data, callback);
        }
    })
};


module.exports = {
    userSignup,
    getUser
}