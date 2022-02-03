const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


const shopStorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"keyVendor/shops",
        allowedFormats:['jpeg', 'png', 'jpg']
    }
});

const itemStorage=new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"keyVendor/items",
        allowedFormats:['jpeg', 'png', 'jpg']
    }
});


const profileStorage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"keyVendor/profiles",
        allowedFormats:['jpeg', 'png', 'jpg']
    }
});

module.exports={
    cloudinary,
    shopStorage,
    itemStorage,
    profileStorage
}