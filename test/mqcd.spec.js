'use strict';

describe('mq common data', () => {
    var MQCD = require('../lib/mqcd').MQCD;
    let options = require('./testdata');

    it('should initialize with default values', () => {
        let options = {};

        const cd = new MQCD(options);

        expect(cd.apiBase).toBe(null);
        expect(cd.username).toBe(null);
        expect(cd.password).toBe(null);
        expect(cd.message).toBe(null);
        expect(cd.hostname).toBe(null);
        expect(cd.port).toBe(null);
        expect(cd.qmgrName).toBe(null);
        expect(cd.requestQ).toBe(null);
        expect(cd.replyQ).toBe(null);
        expect(cd.expired).toBe(10000);
    });

    it('should return options for making request', () => {
        var cd = new MQCD(options);
        var op = cd.getOptions();
        expect(op.hostname).toBe(options.hostname);
        expect(op.port).toBe(options.port);
        expect(op.method).toBe('POST');
        expect(op.headers).not.toBe(null);
    });

    it('should get options for put request', () => {
        const cd = new MQCD(options);
        const op = cd.getOptionsPut();
        expect(op.headers['ibm-mq-md-replyTo']).toBe('REPLY.Q@Q.Mgr');
        expect(op.path).toBe(cd.apiBase+'/messaging/qmgr/'+cd.qmgrName+'/queue/'+cd.requestQ+'/message');
    });

    it('should get options for fetch reply', () => {
        const cd = new MQCD(options);
        const op = cd.getOptionsReply();
        expect(op.path).toBe(cd.apiBase+'/messaging/qmgr/'+cd.qmgrName+'/queue/'+cd.replyQ+'/message');
    });

    it('should set reject unauthorized value to boolean', () => {
        const cd = new MQCD(options);
        expect(cd.getOptions().rejectUnauthorized).toBe(false);
        cd.rejectUnauthorized(true);
        expect(cd.getOptions().rejectUnauthorized).toBe(true);
    });
});