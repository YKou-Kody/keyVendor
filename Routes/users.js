const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require("../Models/user");
const { isLoggedIn } = require('../middleware');

//shop controller later
const userController = require('../Controller/userController');

const passport = require('passport');


router.route('/register')
    .get((req, res) => {
        res.render('./users/register')
    })
    .post(userController.Register);

router.route('/login')
    .get((req, res) => {
        res.render('./users/login')
    }
    )
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        userController.login);


router.route('/logout')
    .get(userController.logout)


module.exports = router;