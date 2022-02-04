const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const sellerService = require('../services/seller.service');
const responseHelper = require('../lib/responseHelper');

router.post('/',async(req,res) => {
    try{
        var result = await sellerService.create(req);
        return responseHelper.SendResponse(res,result);
    }
    catch(err){
        return responseHelper.SendErrorResponse(err,res);
    }
});

router.get('/',async (req,res)=>{
    try{
        var result = await sellerService.getAllSeller(req);
        if(result)
        {
            return res.status(200).json(result);
        }
        else{
            return res.status(400).json(result);
        }
    }
    catch (err) {
        return res.status(500).json({
            isSuccess: false,
            message: "Something Went Wrong.",
            data: err
        });
    }
});
router.get('/:id',async(req,res)=>{
    let User = req.params.id;
    try{
        let result = await sellerService.getById(User);
        return responseHelper.SendResponse(res,result);
    }
    catch(err){
        return responseHelper.SendErrorResponse(err,res)
    }
});
router.delete('/',async(req,res)=>{
    let sellerId = req.params.id;
    try{
        let result = await sellerService.delete(sellerId);
        return responseHelper.SendResponse(res,result);
    }
    catch(err){
        return responseHelper.SendErrorResponse(err,res)
    }
});
router.put('/:id',async(req,res)=>{
    const sellerData = req.body;
    let sellerId = req.params.id;
    try{
        var result = await sellerService.update(sellerId,sellerData);
        return responseHelper.SendResponse(res,result);
    }
    catch(err){
        return responseHelper.SendErrorResponse(err,res);
    }
});
module.exports = router;