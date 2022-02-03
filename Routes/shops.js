const express = require('express');
const router = express.Router({ mergeParams: true });
const Shop = require("../Models/shop");
const catchAsyncError = require("../error/catchAsyncError");

//shop controller later
const multer = require('multer');
const { storage, cloudinary } = require("../Cloudinary/index");
const upload = multer({ storage });
const mboxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mboxGeocoding({ accessToken: mapBoxToken });
const { isLoggedIn } = require("../middleware");



router.get('/new', isLoggedIn, (req, res) => {
    res.render("./shops/new")
})

router.route('/')
    .get(async (req, res) => {
        const shops = await Shop.find({});

        res.render("./shops/allShops", { shops })
    })
    .post(isLoggedIn, upload.array('image'), async (req, res) => {

        const geodata = await geocoder.forwardGeocode({ // gets geodata
            query: req.body.shop.location,
            limit: 1
        }).send();

        const shop = new Shop(req.body.shop);
        shop.geometry = geodata.body.features[0].geometry;
        shop.shopImage = req.files.map(f => ({
            url: f.path,
            filename: f.filename
        }))
        shop.author = req.user._id;
        await shop.save();
        console.log(shop?.shopImage[0]);
        req.flash('success', `Successfully add ${shop.name}`);
        res.redirect(`/shops/${shop._id}`);



    });

router.route('/:id')
    .get(async (req, res) => {
        const { id } = req.params;
        const shop = await Shop.findById(id).populate(
            {
                path: 'reviews',
                populate: {
                    path: 'author'
                }
            });
        res.render("./shops/shop", { shop });

    })
    .put()
    .delete()

router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const shop = await Shop.findById(id);
    res.render("./shops/editShop", { shop });
})




module.exports = router;