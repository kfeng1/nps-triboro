const axios = require('axios');
module.exports.editData = (event, context, callback) => {
    let config = {
        headers: {'Authorization': "bearer " + '0R7-U9bSZHr7z6EF4jBMHb-yCgWGZGfKvzPg6BvoCdK2s'}
    };

    const todo_id = event.pathParameters.id;
    const body = JSON.parse(event.body);
    const test = "id for this was " + todo_id;
    return callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            contact: body,
            id: todo_id
        })
    });

};