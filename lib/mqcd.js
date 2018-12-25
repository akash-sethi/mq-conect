'use strict';

/**
 * MQCommonData is a constructor function that provides properties to set common data for MQ Rest API,
 * and also expose method to fetch options for Put/Get.
 * @constructor
 */
const MQCD  = function(options) {
    var _messageAPI = '/messaging/qmgr/qmgrName/queue/qName/message';

    /** All operation starts with this common base path. */
    this.apiBase = options.apiBase || null;
    this.options = null;
    /** auth username. */
    this.username=options.username || null;
    /** auth password. **/
    this.password=options.password || null;
    /** valid formatted message as string */
    this.message = options.message || null;
    /** hostname without http/https. */
    this.hostname=options.hostname || null;
    /** mq port */
    this.port=options.port || null;
    /** mq queue manager name */
    this.qmgrName=options.qmgrName || null;
    /** mq request queue */
    this.requestQ=options.requestQ || null;
    this.replyQ=options.replyQ || null;
    /** The maximum time to keep message on queue, default 10 seconds */
    this.expired = options.expired || 10000;
    this.messageAPI = options.messageAPI || _messageAPI;

    Object.seal(this);
};

/**
 * This instance method returns mq options for put request.
 * @name MQCD#getOptionsPut
 */
MQCD.prototype.getOptionsPut =  function () {
    var options = this.getOptions();
    options.headers['ibm-mq-md-replyTo']= this.replyQ+'@'+this.qmgrName;
    options.path = this.apiBase + replace(this.messageAPI, { qmgrName: this.qmgrName, qName: this.requestQ });
    return options;
};

/**
 * This instance method returns mq options for reply.
 * @name MQCD#getOptionsReply
 */
MQCD.prototype.getOptionsReply =  function () {
    var options = this.getOptions();
    options.method = 'DELETE';
    options.path = this.apiBase + replace(this.messageAPI, { qmgrName: this.qmgrName, qName: this.replyQ });
    return options;
};

MQCD.prototype.getOptions = function(){
    if(this.options === null) this.setOptions();
    return JSON.parse(JSON.stringify(this.options));
};

MQCD.prototype.setOptions =  function () {
    this.options = {
        hostname: this.hostname, // without http/s
        port: this.port,
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + new Buffer(this.username + ':' + this.password).toString('base64'),
            'Content-Type' : 'text/plain',
            // this token is required to set even with empty value for POST operations.
            'ibm-mq-rest-csrf-token' : '',
            'ibm-mq-md-expiry': this.expired
        },
        rejectUnauthorized: false
    }
};

MQCD.prototype.rejectUnauthorized = function (val) {
    this.options.rejectUnauthorized = !!val;
};


const replace = function(text, obj){
    var txt = text;
    for(let k in obj){
        if(obj.hasOwnProperty(k)){
            txt = txt.replace(new RegExp(k), obj[k]);
        }
    }
    return txt;
};

exports.MQCD = MQCD;