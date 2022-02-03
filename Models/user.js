const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocal = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    userType: {
        type: String,
        enum: ["admin", "user"],
        default: 'user',
        required: true
    },
    profilePic: {
        url: String,
        filename: String
    },
    displayName: {
        type: String
    }
});


UserSchema.plugin(passportLocal);



module.exports = mongoose.model('User', UserSchema);