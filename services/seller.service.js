//const res = require('express/lib/response');
const mongoose = require('mongoose');
const sellerModel = require('../model/seller.model');

async function Create(req) {
    try {
        var result = await sellerModel.create(req.body)
            .then(doc => {
                if (result != "") {
                    return { isSuccess: true, message: "Seller Created SuccessFully!", data: doc };
                }
                else (err) => {
                    return { isSuccess: false, message: "Can't Create!!", data: err }
                }
            })
            .catch(err => {
                return { isSuccess: false, message: "Seller Couldn't Create!", data: err }
            });
        return result;
    }
    catch (error) {
        return { isSuccess: false, message: "Failed!", data: error };
    }
};

async function GetAll(req) {

    try {
        let pageSize = 5;
        //pageSize = parseInt(req.query.pageSize)
        let pageNumber = req.query.pageNumber > 1 ? req.query.pageNumber : 1;
        let skip = (pageNumber - 1) * pageSize;
        let filter = {};
        let sorting = {};
        if (req.query.country != undefined) {
            let country = req.query.country.split(",");
            if (req.query.country) filter['address.country'] = { $in: (country ? country : '') };
        }
        if (req.query.name) filter.name = { $regex: '.*' + req.query.name + '.*', $options: 'i' };
        
        if(req.query.keywePrice) filter.keywePrice ={keywePrice: { $gt: 1.0000, $lt: 120.0000 }};

        
        if (req.query.sortBy && req.query.orderBy) {
            let sortByList = req.query.sortBy.split(",");
            let orderByList = req.query.orderBy.split(",");

            for (let i = 0; i < sortByList.length; i++) {
                let sortField = sortByList[i];
                sorting[sortField] = orderByList[i] === "desc" ? -1 : 1;
            }
        }
        var count = await sellerModel.where(filter)
            .count()
            .then(res => {
                return { isSuccess: true, data: res };
            })

        var result = await sellerModel.find()
            //.select("name")
            .where(filter)
            //.where(country)
            .limit(pageSize)
            .skip(skip)//skip before all the data
            .sort(sorting)
            .then(res => {
                return {
                    isSuccess: true,
                    message: "Seller List!!!",
                    data: res,
                    currentPage: pageNumber,
                    pageSize: pageSize,
                    totalRecords: count.data

                }
            }).catch(err => {
                return {
                    isSuccess: false,
                    message: "Failed to get Seller List",
                    data: err,
                    currentPage: pageNumber,
                    pageSize: pageSize,
                    totalRecords: 0
                }
            })
        return result;
    }
    catch (error) {
        return {
            isSuccess: false,
            message: "Failed!!!",
            data: error,
            currentPage: 0,
            pageSize: 0,
            totalRecords: 0
        }
    }
};
async function GetById(id) {
    try {
        var result = await sellerModel.findById(id)
            .then(doc => {
                return { isSuccess: true, message: "Seller Get It!!!", data: doc };
            })
            .catch(err => {
                return { isSuccess: false, message: "Seller Didn't Get", data: err }
            });
        return result;
    }
    catch (error) {
        return { isSuccess: false, message: "Failed!", data: error }
    }
};
async function Delete(id) {
    try {
        var result = await sellerModel.deleteOne({ sellerId: id })
            .then(doc => {
                return { isSuccess: true, message: "Seller deleted Successfully", data: doc };
            })
            .catch(err => {
                return { isSuccess: false, message: "Can't Delete", data: err };
            });
        return result;
    }
    catch (error) {
        return { isSuccess: false, message: "Failed!", data: error }
    }
};
async function Update(id, req) {
    try {
        var result = await sellerModel.findByIdAndUpdate(id, req)
            .then(doc => {
                return { isSuccess: true, message: "Update Successfully", data: doc };
            })
            .catch(err => {
                return { isSuccess: false, message: "Can't Update", data: err }
            });
        return result;
    }
    catch (error) {
        return { isSuccess: false, message: "Seller Can't Update", data: error };
    }
};
module.exports = {
    create: Create,
    getAllSeller: GetAll,
    getById: GetById,
    delete: Delete,
    update: Update
}