import User from './schemas/User.js';
import response from './utils/response';
import connect from './utils/connect';
import Review from './schemas/Review.js';
import mongoose from 'mongoose';


export const submit = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    try {
        await connect(context);
    } catch {
        callback(null, response(500, {
            error: 'Error connecting to db'
        }))
    }
    let sentiment = "";
    let total = 0;
    let filled = 0;
    body.ratings.forEach((elem) => {
        if (elem != null) {
            total++;
            total += typeof (elem) == "boolean" ? 10 : elem;//yes=10, no = 0
        }
    });
    total = total / filled;
    if (total > 9) {
        sentiment = "good"
    } else if (total > 4) {
        sentiment = "ok"
    } else {
        sentiment = "bad"
    }
    let review = Review.create({
        userId: body.id,
        confirmation: body.ratings[0],
        delivery: Boolean(body.ratings[1]),
        deliveryRating: body.ratings[1] ? body.ratings[1] : -1,
        websiteEase: body.ratings[2],
        lookingFor: body.ratings[3],
        comments: body.comments,
        sentiment: sentiment
    });

    try {
        await review.save();
    } catch (error) {
        await mongoose.connection.close();
        callback(null, response(422, {
            msg: `Failed to upload review to db\nError: ${error}`
        }));
    }

    sentiment += 'Reviews';
    try {
        await User.findOneAndUpdate({'id': body.id}, {$inc: {[sentiment]: 1}}, {upsert: true});
    } catch (error) {
        await mongoose.connection.close();
        callback(null, response(422, {
            msg: `Failed to update user in db\nError: ${error}`
        }));
    }
    await mongoose.connection.close();
    callback(null, response(200, {
        msg: 'Successfully uploaded review and updated user'
    }));


};


