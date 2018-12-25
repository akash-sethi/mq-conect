'use strict';

var app = require('../lib/index');

describe('App connect', function () {
    let mqSpy, mq;
    let data = require('./testdata');
    beforeEach(() => {
          mq = require('../lib/mq');
          mqSpy = jest.spyOn(mq, 'put');
      });

      afterEach(() => {
          jest.restoreAllMocks();
      });

      it('should call put method', function (done) {
          app.connect(data, () => {});
          expect(mqSpy).toHaveBeenCalled();
          done()
      });

      it('should throw an exception ', (done) => {
          expect(() => {app.connect(data)}).toThrow('callback is not of function type');
          done();
      });
});
