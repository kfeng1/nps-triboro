const axios = require('axios');
module.exports.editData = (event, context, callback) => {
    var data = JSON.parse(event.body);
    /**for (var property in data) {
        if (data[property] === null || data[property] === undefined) {
            delete data[property];
        }
    }**/
    const id = data.id;
    console.log(data);
    let config = {
        headers: {'Authorization': "bearer " + '0R7-U9bSZHr7z6EF4jBMHb-yCgWGZGfKvzPg6BvoCdK2s'}
    };

    let route = 'https://api.salesflare.com/contacts/' + id;
    console.log(route);
    axios.put(route, data, config).then((response) => {
        console.log(response);
    });

};