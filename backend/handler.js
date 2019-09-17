const User = require('./users/User.js');
const response = require('./utils/response');
const connect = require('./utils/connect');
const mongoose = require('mongoose');

module.exports.submit = async (event, context, callback) => {
    console.log(event.body);
    mongoose.connect(process.env.DB, {
        useNewUrlParser: true
    })
    try {
        await mongoose.connection;
        const user = new User({
            email: 'asippot@gmail.com',
            feedback: {
                ratings: event.body.ratings,
                comments: "test",
                bucket: "okay"
            }
        });
        user.save((err) => {
            if (err) callback(null, response(500, {
                error: 'Error uploading user to db'
            }));
        }).then(()=>{
            callback(null, response(200, {
                msg: 'Successfully uploaded user'
            }));
        });
    } catch {
        callback(null, response(500, {
            error: 'Error connection to db'
        }))

    }

};

