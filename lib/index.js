'use strict';

/**
 * @module: mq-rest
 */
const mq = require('./mq');

/**
 * This method accepts common data options to connect to mq. check examples for more details.
 * @param cd
 * @param callback
 */
exports.connect = function (cd, callback) {
    if(!callback || typeof callback !== 'function')
        throw 'callback is not of function type';
    mq.put(cd)
        .then(body => callback(null, body))
        .catch(err => callback(err, null));
};