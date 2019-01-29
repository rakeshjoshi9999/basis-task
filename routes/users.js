const express = require('express');
const router = express.Router();
const expressJoi = require('express-joi');
const md5 = require('md5'); //md5 for salting the password
const { Auth } = require('../config');

// configuring passport
const passport = require('passport');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const controller = require('../controllers');
const config = require('../config');

//jwt configuration
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = Auth.Secret;
router.use(passport.initialize());

// new strategy
const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    let user = controller.userController.getUser({
        _id: jwt_payload.id
    }, (err, agent) => {
        if (agent) {
            next(null, agent);
        } else {
            next(null, false);
        }
    });
});
passport.use('userJWT', strategy);

// ::::::::::::::::::::::::ROUTES::::::::::::::::::::
//User signup route
var Joi = {
    username: expressJoi.Joi.types.String().min(3).max(1000).required(),
    firstname: expressJoi.Joi.types.String().min(3).max(1000).required(),
    lastname: expressJoi.Joi.types.String().min(3).max(1000).required(),
    email: expressJoi.Joi.types.String().min(3).max(1000).required(),
    password: expressJoi.Joi.types.String().min(6).max(16).required()
};
router.post('/signup', expressJoi.joiValidate(Joi), (req, res) => {
    req.body.password = md5(req.body.password);
    controller.userController.userSignup(req.body, (err, data) => {
        if (err) {
            res.json({
                status: config.Status.STATUS.ERROR.BAD_REQUEST,
                message: 'Something went wrong!!!',
                err: err
            });
        } else if (!data) {
            res.json({
                status: config.Status.STATUS.ERROR.BAD_REQUEST,
                message: 'Username already Exists in the Database.Please Try Something else '
            });
        } else {
            res.json({
                status: config.Status.STATUS.SUCCESS.DEFAULT,
                message: 'User added successfully',
                data: {
                    "username": data.username,
                    "email": data.email
                }
            });
        }
    });
});


// User Login

var Joi = {
    email: expressJoi.Joi.types.String().min(3).max(1000).required(),
    password: expressJoi.Joi.types.String().min(6).max(16).required()
};
router.post('/login', expressJoi.joiValidate(Joi), (req, res) => {
    controller.userController.userLogin(req.body, (err, data) => {
        if (err) {
            res.json({
                status: config.Status.STATUS.ERROR.BAD_REQUEST,
                message: 'Something went wrong!!!',
                err: err
            });
        } else {
            res.json({
                status: data.status,
                message: data.message,
                token: 'JWT ' + data.token,
                data: data.data
            });
        }
    });
});


router.get('/getuser', [passport.authenticate('userJWT', { session: false })], (req, res) => {
    console.log("Inside /getuser");
    controller.userController.getUserDetails(req.query, (err, data) => {
        if (err) {
            res.json({
                status: config.Status.STATUS.ERROR.BAD_REQUEST,
                message: "Cannot find User, Try again!",
                data: err
            });
        } else {
            res.json({
                status: config.Status.STATUS.SUCCESS.DEFAULT,
                message: '::User Details::',
                data: {
                    username: data.username,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email
                }
            });
        }
    });

});

// logout

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
})

module.exports = router;