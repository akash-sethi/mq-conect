'use strict';

describe('mq file', () => {
    let api;
    let data = require('./testdata');
    beforeEach(() => {
        api = require('../lib/api');
        api.post = jest.fn(() => Promise.resolve({statusCode: '200'}));
        api.delete = jest.fn(() => Promise.resolve({statusCode: '200', message: 'got message'}));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('put method should call api post', (done) => {
        const mq = require('../lib/mq');
        mq.put(data)
            .then(res => {
                expect(res.message).toBe('got message');
                expect(api.delete).toHaveBeenCalled();
            });
        expect(api.post).toHaveBeenCalled();
        done()
    })
});