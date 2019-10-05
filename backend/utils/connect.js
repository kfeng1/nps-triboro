import mongoose from 'mongoose';


export default function (context) {
    return new Promise(async (resolve, reject) => {
        context.callbackWaitsForEmptyEventLoop = false;
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


