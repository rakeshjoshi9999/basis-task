const models = require('../models');

// add user to the db
const addUser = (data, callback) => {
    models.Users.Users(data).save(callback);
};

// get user from db using criteria specified
const getUser = (criteria, callback) => {
    models.Users.Users.findOne(criteria, callback);
}

// update user based on criteria
const updateUser = (criteria, payload, options, callback) => {
    models.Users.Users.findOneAndUpdate(criteria, payload, options, callback);
}

module.exports = {
    addUser,
    getUser,
    updateUser
}