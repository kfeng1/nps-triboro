const axios = require('axios');

module.exports.getData = (event, context, callback) => {
    let config = {
        headers: {'Authorization': "bearer " + '0R7-U9bSZHr7z6EF4jBMHb-yCgWGZGfKvzPg6BvoCdK2s'},
    };
    let search = event.queryStringParameters.search.toLowerCase();
    if (search == '') {//normal
        config.params = event.queryStringParameters;
        delete config.params.search;
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
    } else {//search
        console.log(search);
        let arr = [];
        function getData(url, offset) {
            return axios(url + offset, config)
                .then((res) => {
                    if (res.data.length == 100) {
                        res.data = res.data.filter(function (contact) {
                            let names = contact.name.toLowerCase().substring(0, search.length) == search;
                            let tags = contact.tags.some(x => x.name.toLowerCase() == search);
                            return names || tags;
                        });
                        arr = arr.concat(res.data);
                        getData(url, offset + 100)
                    } else if (res.data.length < 100) {
                        arr.concat(res.data);
                        var o = event.queryStringParameters.offset;
                        var l = event.queryStringParameters.limit;
                        const response = {
                            statusCode: 200,
                            body: JSON.stringify({
                                contacts: arr.slice(o, o+l)
                            })
                        };
                        callback(null, response);
                    }
                });
        }
        getData('https://api.salesflare.com/contacts?limit=100&offset=', 0);
    }
};


