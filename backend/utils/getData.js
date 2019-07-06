const axios = require('axios');
const util = require('util')

module.exports.getData = (event, context, callback) => {
    let config = {
        headers: {'Authorization': "bearer " + '0R7-U9bSZHr7z6EF4jBMHb-yCgWGZGfKvzPg6BvoCdK2s'},
        params: {
            //limit: 1000000
        }
    };
    axios.get('https://api.salesflare.com/contacts', config)
        .then(resp => {
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    contacts: resp.data
                })
            };
            callback(null, response);
        });

};
