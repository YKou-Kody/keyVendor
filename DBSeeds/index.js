const express = require('express');
const mongoose = require('mongoose');
const Review = require('../Models/review');
const Shop = require("../Models/shop")
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/keyVendor');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

db.once("open", () => {
    console.log("Database connected");
});

const sample = array => {
    return array[Math.floor(Math.random() * array.length)]
}

const seedDB = async () => {
    await Review.deleteMany({});
    await Shop.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const shop = new Shop({
            // owner: '61ef1027c37b966ae321d330',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates:
                    [
                        cities[random1000].longitude,
                        cities[random1000].latitude
                    ]
            },
            image: [
                {
                    url: 'https://i.ytimg.com/vi/sjozpa9DsZU/maxresdefault.jpg',
                    filename: 'Xiao'
                },
            ],
            description: " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit eos quas laborum minima illo quaerat ipsum eligendi dicta optio. Nulla minus dignissimos error adipisci doloremque alias numquam eos a ratione?"
        })
        await shop.save();
    }


}
seedDB().then(() => {
    mongoose.connection.close()
})