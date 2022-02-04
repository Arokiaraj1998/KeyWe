const mongoose = require('mongoose');

const AddressSchema =  new mongoose.Schema({  
    doorNo:{type:Number},
    street:{type:String},
    city: { type: String },
    state: { type: String },
    zipcode:{ type: String }, 
    country: { type: String },
});
module.exports = AddressSchema; 