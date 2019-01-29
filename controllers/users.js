const md5 = require('md5');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const status = require('../config/status');
const userService = require('../services');
const { Auth } = require('../config');

// controller to get a user
const getUser = (criteria, callback) => {
    userService.userService.getUser(criteria, (err, user) => {
        if (err) {
            callback(err)
        } else {
            callback(null, user);
        }
    })
}

// controller to register new user
const userSignup = (data, callback) => {
    let criteria = { email: data.email };
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
// user login
const userLogin = (data, callback) => {
    let criteria = { username: data.username };
    userService.userService.getUser(criteria, (err, udata) => {
        if (err) {
            callback(null, {
                status: status.STATUS.ERROR.BAD_REQUEST,
                message: 'Something went wrong try again!',
                err: err
            });
        } else {
            if (!udata) {
                callback(null, {
                    status: status.STATUS.ERROR.NOT_FOUND,
                    message: 'User email is not registered..!Please try with registered email'
                });
            } else if (udata) {
                if (udata.password != md5(data.password)) {
                    callback(null, {
                        status: status.STATUS.ERROR.BAD_REQUEST,
                        message: 'Invalid password.'
                    });
                } else {
                    var payload = {
                        id: udata.id,
                        email: udata.email,
                        password: udata.password
                    }
                    var token = jwt.sign(payload, Auth.Secret, {
                        expiresIn: "1h"
                    });
                    callback(null, {
                        status: status.STATUS.SUCCESS.DEFAULT,
                        message: 'Login successful.',
                        token: token
                    });
                }
            }
        }
    });
};

// get user details
const getUserDetails = (payload, callback) => {
    let criteria = {
        _id: mongoose.Types.ObjectId(payload.user_id)
    }
    userService.userService.getUser(criteria, (err, data) => {
        if (err) {
            callback(err);
        } else {
            callback(err, data);
        }
    });
}
// update the user
const updateUser = (user_id, updateData, options, callback) => {
    let critaria = {
        _id: user_id
    }
    userService.userService.updateUser(critaria, updateData, options, (err, updatedUser) => {
        if (err) {
            callback(err)
        } else {
            callback(null, updatedUser);
        }
    })
}

module.exports = {
    getUser,
    userSignup,
    userLogin,
    getUserDetails,
    updateUser
}