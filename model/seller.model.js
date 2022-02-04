const mongoose = require('mongoose');
const addressSchema = require('./address.model');

const sellerSchema = mongoose.Schema({
    name:{type:String},
    keywePrice:{type:String},
    listPrice:{type:String},
    days_on_market:{type:Number},
    address:[addressSchema],
});

module.exports = mongoose.model('Seller',sellerSchema)