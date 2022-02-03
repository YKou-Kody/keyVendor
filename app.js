if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport');
const localStrategy = require('passport-local');
const AppError = require("./error/AppError");
const catchAsyncError = require("./error/catchAsyncError");

// Import different routers used
const shopRoutes = require("./Routes/shops")
const userRoutes = require("./Routes/users");
const reviewRoutes = require("./Routes/reviews");

// Import models
const User = require("./Models/user")

// connect to mongoose under the database name keyVendor
mongoose.connect('mongodb://localhost:27017/keyVendor');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', ejsMate);
app.use(methodOverride('_method'));




app.use(express.static(path.join(__dirname, 'public')))
const sessionConfig = {
    secret: "TemporarySecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,

    }
}
app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;

    return next();
})

//Routers
app.use("/shops", shopRoutes);
app.use("/", userRoutes);
app.use("/shops/:shopId/reviews", reviewRoutes);


app.get("/", (req, res) => {
    res.render('home.ejs')
})

app.all("*", (req, res, next) => {
    next(new AppError("OPS! PAGE NOT FOUND", 404));
})

app.use((err, req, res, next) => {
    if (!err.message) {
        err.message = "Unexpected error: "
    }
    const { statusCode = 500 } = err;
    res.status(statusCode).render('error', { err });
})


app.listen(3000, () => {
    console.log('Successfully hosted')
})