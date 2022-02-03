const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require("../Models/review");
const Shop = require('../Models/shop');
//shop controller later

router.route('/')
    .post(async (req, res) => {
        const { shopId } = req.params;
        const shop = await Shop.findById(shopId);
        const review = new Review(req.body.review);
        review.author = req.user._id;
        shop.reviews.push(review);
        await review.save();
        await shop.save();
        req.flash("success", `Successfully added review to ${shop.name}`);
        res.redirect(`/shops/${shop._id}`);


    })

router.route('/:reviewId')
    .post()

    .delete()





module.exports = router;