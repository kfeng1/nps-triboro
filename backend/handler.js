const User = require('./schemas/User.js');
const response = require('./utils/response');
const connect = require('./utils/connect');


module.exports.submit = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    try {
        await connect();
        let bucket = "good";
        let issue = false;
        //If user has a rating below 3, inclusive, then considered "bad"
        //If user has ratings all above 8, inclusive then considered "good"
        //Otherwise, rating is "okay"
        //may want to change this to calculate user based off of bucket?
        body.ratings.forEach((elem)=>{
            if(elem<=3){
                bucket="bad";
                issue=true;
            }
            if(elem<8&&bucket!=="bad") bucket = "okay";
        });
        User.find({'id': body.id}, async (err, data)=>{
            if (err) return response(500, {
                error: 'Error uploading user to db'
            })
            let user = null;
            if(data.length===0){
                user = new User({
                    id: 'body.id',
                    reviews: [body],
                    bucket: bucket,
                    issues:[]
                });
            }else{
                user = new User(data[0]);
                user.reviews.push(body);
                user.bucket = bucket;
            }
            if(issue) user.issues.push = user.reviews.length-1;
            await User.findOneAndUpdate({'id': body.id}, user, {upsert: true}, (err) => {
                if (err) return response(500, {
                    error: 'Error uploading user to db'
                });
            });
            return (null, response(200, {
                msg: 'Successfully uploaded user'
            }));
        });
    } catch {
        return (null, response(500, {
            error: 'Error connection to db'
        }))
    }

};

