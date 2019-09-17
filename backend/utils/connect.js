const mongoose = require('mongoose');
const User = require('../schemas/User');

module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        //context.callbackWaitsForEmptyEventLoop = false;
        mongoose.connect(process.env.DB, {
            useNewUrlParser: true
        })
        try {
            await mongoose.connection;
            resolve();
        } catch (err) {
            if (err) console.log(err);
            process.exit();
            reject();
        }
    })
}


/**
 return new Promise(async (resolve, reject) => {
        //context.callbackWaitsForEmptyEventLoop = false;
        mongoose.connect(process.env.DB, {
            useNewUrlParser: true
        })
        try {
            await mongoose.connection;
            resolve();
        } catch (err) {
            if (err) console.log(err);
            process.exit();
            reject();
        }
    })**/

/**
mongoose.connect('mongodb://localhost/event-db');
var new_user = new User({
    name:req.body.name
    , email: req.body.email
    , password: req.body.password
    , phone: req.body.phone
    , _enabled:false
});
new_user.save(function(err){
    if(err) console.log(err);
});

/**
 * return new Promise(async (resolve, reject) => {
		context.callbackWaitsForEmptyEventLoop = false;

		try {
			await mongoose.connection;
			resolve();
		} catch (err) {
			if (err) console.log(err);
			process.exit();
			reject();
		}
		context.callbackWaitsForEmptyEventLoop = false;
    mongoose.connect(process.env.DB, {
        useNewUrlParser: true
    });
    try {
        await mongoose.connection;
        const user = new User({
            email: 'asippot@gmail.com',
            feedback:{
                ratings:[7, 9],
                comments: "test",
                bucket: "Good"
            }
        });
        user.save((err) => {
            if (err) console.log(err);
        })
    } catch (err) {
        if (err) console.log(err);
        process.exit();
    }

 */
