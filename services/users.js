const models = require('../models');

const addUser = (data, callback) => {
    models.Users.Users(data).save(callback);
};

const getUser = (criteria, callback) => {
    models.Users.Users.findOne(criteria, callback);
}

const updateUser = (criteria, payload, options, callback) => {
    models.Users.Users.findOneAndUpdate(criteria, payload, options, callback);
}

module.exports = {
    addUser,
    getUser,
    updateUser
}