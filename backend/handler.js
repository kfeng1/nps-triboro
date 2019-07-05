'use strict';
const axios = require('axios');

module.exports.test = (event, context, callback)=>{
    let config = {
        headers: {'Authorization': "bearer " + '0R7-U9bSZHr7z6EF4jBMHb-yCgWGZGfKvzPg6BvoCdK2s'}
    };
    axios.get('https://api.salesflare.com/contacts', config)
        .then(resp => {
            console.log(resp);
        });

  const response = {
      statusCode: 200,
      body: JSON.stringify({
          message:"This worked",
          input: event
      })
  };
};

