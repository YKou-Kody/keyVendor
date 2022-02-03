module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        if (req.method == "GET") req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in to perform this action');
        return res.redirect('/login');
    }
    next();

}