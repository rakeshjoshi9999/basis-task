const models = require('../models');

const addUser = (data, callback) => {
    models.Users.Users(data).save(callback);
};

const getUser = (criteria, callback) => {
    models.Users.Users.findOne(criteria, callback);
};


module.exports = {
    addUser,
    getUser
}