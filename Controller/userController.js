const { model } = require("mongoose");
const Review = require("../Models/review");
const User = require("../Models/user");


module.exports.Register = async (req, res) => {
    const { email, username, password, displayName, userType } = req.body;
    try {
        const user = new User({ email, username, displayName, userType });
        const registered = await (User.register(user, password));
        req.login(registered, err => {
            if (err) return next(err);
            console.log(registered);
            req.flash('Success', 'Welcome to keyVendors!');
            res.redirect('/')
        })
    } catch (e) {
        console.log(e)
        req.flash("error", "Failed")
        res.redirect('/register')
    }
}

module.exports.login = (req, res, next) => {
    if (req.session.returnTo) {
        return res.redirect(req.session.returnTo);
    }
    req.flash('success', 'Successfully loggedin');
    res.redirect('/shops');
};

module.exports.logout = (req, res) => {
    req.logout(); // added by passport
    req.flash('success', 'Successfully logged out');
    res.redirect('/');
}