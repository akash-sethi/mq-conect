'use strict';

const https = require('https');

module.exports = {
    /**
     * This method is used to send message to MQ.
     * @param options
     * @param msg
     * @return {Promise}
     */
    post: function (options, msg) {
        return new Promise((resolve, reject) => {
            const req = https.request(options, (response) => {
                    if (response.statusCode < 200 || response.statusCode > 299) {
                        const errMsg = {statusCode: response.statusCode, result: "Fail", message: response.statusMessage};
                        reject(JSON.stringify(errMsg));
                    }
                    var body = '';
                    response.on('data',(chunk) => body +=chunk);
                    response.on('end', () => resolve());
                });

            req.on('error', (error) => {
                reject(error)
            });
            req.write(msg);
            req.end();
         });
    },
    /**
     * This method is used get the message that has successfully sent to MQ.
     * @param options
     * @return {Promise}
     */
    delete: function (options) {
        return new Promise((resolve, reject) => {
            var req = https.request(options, (response) => {
                if (response.statusCode < 200 || response.statusCode > 299) {
                    var errMsg = {statusCode: response.statusCode, result: "Fail", message: response.statusMessage};
                    reject(JSON.stringify(errMsg));
                }
                var body = '';
                response.on('data',(chunk) => body +=chunk);
                response.on('end', () => resolve(JSON.stringify({status: response.statusCode, body: body})));
            });

            req.on('error', (error) => reject(error));
            req.end();
        });
    }
};