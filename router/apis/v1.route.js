const express = require('express'); 
let router = express.Router();

const sellerController = require('../../controllers/seller.controller')

router.use('/seller',sellerController)

module.exports = router;