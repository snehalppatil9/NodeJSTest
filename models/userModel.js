const { body } = require('express-validator/check');
var mongoose = require('mongoose');
var mongoSchema = mongoose.Schema;
// Setup schema
var userSchema = mongoSchema({
    FirstName: {
        type: String,
        required: [true, "First Name is required"]
    },
    LastName: {
        type: String,
        required: [true, "Last Name is required"]
    },
    Email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    Phone: {
        type: Number,
        required: [true, "phone number is required"]
    },

});
var user = mongoose.model('employee', userSchema);
function userModel() { }

userModel.prototype.createUser = (body, callback) => {
    console.log("Body",body);
    user.find({
        "Email": body.Email
    }, (err, data) => {
        if (err) {
            console.log("Error in Registration");
            callback("User Already Present")
        }
        else {
            const newUser = new user({
                "FirstName": body.FirstName,
                "LastName": body.LastName,
                "Email": body.Email,
                "Phone": body.Phone
            });
            newUser.save((err, result) => {
                console.log("dffdfsf",err)
                if (err) {
                    console.log("Model not found");
                    callback(err, result);
                } else {
                    console.log("Registered Successfully");
                    callback(null, result)
                }
            })
        }
    });
}



userModel.prototype.updateUserData = (req, callback) => {

    console.log('in model--data:--', req);
    // console.log('in model--body:--', req.id);
    user.find({ "_id": req.id }, function (err, data) {
        if (err) {
            console.log("err in model update")
            callback("error is in model" + err)
        }
        else {
            console.log("Update model ==>", data)
            // console.log("______", req.data.Email);
            const newUser = new user({
                "FirstName": req.data.FirstName,
                "LastName": req.data.LastName,
                "Email": req.data.Email,
                "Phone": req.data.Phone
            });
            console.log("______", newUser);

            user.updateOne({ newUser }, function (err, data) {
                if (err)
                    callback("You Last login Yesterday");
                else {
                    callback("Success")
                }
            })
        }
    })


}


userModel.prototype.getAllUsers = (req, callback) => {
    user.find({}, (err, data) => {
        console.log(data);
        if (err) {
            callback("error is in model" + err)
        } else {
            callback(null, data);
        }
    })
}

userModel.prototype.getUsersById = (req, callback) => {
    user.find({ "_id": req }, (err, data) => {
        if (err) {
            callback("error is in model" + err)
        } else {
            callback(null, data);
        }
    })
}


userModel.prototype.deleteUser = (req, callback) => {
    console.log("Delete APi ===> ", req.body)
    user.findOne({ "Email": req.body.Email }, (err, data) => {
        if (err) {
            console.log("Email Id is not present in DB");
            callback("Email Id is not present in DB" + err)
        } else {
            var myquery = { "Email": req.body.Email };
            // console.log("myquery", myquery)
            user.deleteOne(myquery, function (err, obj) {
                if (err) throw err;
                else {
                    console.log("1 record deleted");
                }
            });
            callback(null, data);
        }
    })
}

module.exports = new userModel();
