'use strict';

describe('api.js of mq connect', () => {
    var getOptions = function () {
        return {
            hostname: 'localhost',
            port: '9443',
            method: 'POST',
            headers:
                { Authorization: 'Basic YXBwc21xbTExOmRldm1xbTEy',
                    'Content-Type': 'text/plain',
                    'ibm-mq-rest-csrf-token': '',
                    'ibm-mq-md-expiry': 10000,
                    'ibm-mq-md-replyTo': 'LAMBDA.REPLY@TESTQMV9' },
            rejectUnauthorized: false,
            path: '/ibmmq/rest/v1/messaging/qmgr/TESTQMV9/queue/LAMBDA.REQUEST/message' }
    };
    let https, cd;
    let api = require('../lib/api');

    beforeEach(() => {
        https = require('https');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create message', (done) => {
        let options = getOptions();
        https.request = jest.fn((options, cb) => cb({statusCode: 201}));
        api.post(options, 'valid message')
            .then((res) => {
                expect(res.statusCode).toBe('201')
            })
            .catch();
        done();
    });

    it('should get unauthorize response', (done) => {
        let options = getOptions();
        options.username = 'wrong.user';
        options.password = 'or.wrong.password';
        https.request = jest.fn((options, cb) => cb({ "statusCode": 401, "result": "Fail", "message": "Unauthorized" }));
        api.post({}, 'message')
            .then((res) => {
                expect(res.statusCode).toBe('401');
                expect(res.message).toBe('Unauthorized');
                expect(res.result).toBe('Fail');
            },() => {});
        done();
    });

    it('should return 404 for incorrect path', (done) => {
        let options = getOptions();
        options.apiBase = '/invalid/path';
        https.request = jest.fn((options, cb) => cb({"statusCode":404,"result":"Fail","message":"Not Found"}
        ));
        api.post({}, 'message')
            .then((res) => {
                expect(res.statusCode).toBe('404');
                expect(res.message).toBe('Not Found');
                expect(res.result).toBe('Fail');
            },() => {});
        done();
    });

    it('should return 404 for incorrect qMgr configuration', (done) => {
        let options = getOptions();
        options.qmgrName = 'invalidQMgrName';
        https.request = jest.fn((options, cb) => cb({"statusCode":404,"result":"Fail","message":"Not Found"}
        ));
        api.post({}, 'message')
            .then((res) => {
                expect(res.statusCode).toBe('404');
                expect(res.message).toBe('Not Found');
                expect(res.result).toBe('Fail');
            },() => {});
        done();
    });

    it('should return 404 for incorrect requestQ configuration', (done) => {
        let options = getOptions();
        options.qmgrName = 'requestQ';
        https.request = jest.fn((options, cb) => cb({"statusCode":404,"result":"Fail","message":"Not Found"}
        ));
        api.post({}, 'message')
            .then((res) => {
                expect(res.statusCode).toBe('404');
                expect(res.message).toBe('Not Found');
                expect(res.result).toBe('Fail');
            },() => {});
        done();
    });

    it('should return 200 for reply', (done) => {
        let options = getOptions();
        https.request = jest.fn((options, cb) => cb({"statusCode":200, "message":"hello"}
        ));
        api.delete(options)
            .then((res) => {
                expect(res.statusCode).toBe('200');
                expect(res.message).toBe('hello');
            },() => {});
        done();
    });

    it('should fail for reply', (done) => {
        let options = getOptions();
        options.username = 'wronguser';
        https.request = jest.fn((options, cb) => cb({"statusCode": 401, "message":"Unauthorized"}
        ));
        api.delete(options)
            .then((res) => {
                expect(res.statusCode).toBe('401');
            },() => {});
        done();
    })
});