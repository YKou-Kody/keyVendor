const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace("/upload", "/upload/w_200")
})

const opts = { toJSON: { virtuals: true } };

const ShopSchema = new Schema({
    name: String,
    shopImage: [ImageSchema],
    image: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    description: String,
    location: String,
    // owner: String,
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    website: String,
    twitter: String,
    instagram: String,
    facebook: String

}, opts);



module.exports = mongoose.model('Shop', ShopSchema);