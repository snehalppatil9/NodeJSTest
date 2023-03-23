
var userModel = require('../models/userModel');
exports.createUser = (data, callback) => {
    userModel.createUser(data, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        }
        else {
            console.log("In service", result);
            callback(null, result);
        }
    })
}

exports.getAllUsers = (req, callback) => {
    userModel.getAllUsers(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.getUsersById = (req, callback) => {
    userModel.getUsersById(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}

exports.updateUserData = (req, callback) => {
    userModel.updateUserData(req, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result)
        }
    })
}

exports.deleteUser = (req, callback) => {
    userModel.deleteUser(req, (err, data) => {
        if (err) {
            return callback(err);
        } else {
            return callback(null, data);
        }
    })
}