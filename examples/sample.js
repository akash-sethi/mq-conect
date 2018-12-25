var mq = require('../lib/index');

var options = {
    username: '<username>',
    password: '<password>',
    hostname: 'localhost',
    port: '9443',
    apiBase: '/ibmmq/rest/v1',
    qmgrName: 'TESTQMV9',
    requestQ: 'REQUEST_QUEUE',
    replyQ: 'REPLY_QUEUE',
    message: 'hello world'
}

try {
    mq.connect(options, function (err, data) {
        if(err){
            console.log(err);
            return;
        }
        console.log(data);
    });
}catch (e) {
    console.log(e);
}