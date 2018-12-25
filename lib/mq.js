'use strict';

const api = require('./api');
const MQCD  = require('./mqcd').MQCD;

/**
 * This method accepts options required to connect with mq9. create an instance of common data and send message to MQ.
 * If message is put successfully it try to fetch the response.
 * @param options
 * @return {Promise}
 */
const put = function(options){
    if(!options || options === null || typeof options !== 'object') throw new TypeError('Invalid parameters passed');

    const cd = new MQCD(options);

    return api.post(cd.getOptionsPut(), cd.message)
      .then(() => reply(cd));
};

const reply = function(cd) {
    const options = cd.getOptionsReply();
    return api.delete(options);
};

exports.put = put;