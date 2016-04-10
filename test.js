const expect = require('chai').expect;

///rest of test eludes me but here's an example from class

describe('async test', () => {
  it('is apparently the best test', (thing) => {
    process.nextTick(() => {
      expect(true).to.eql(true);
      thing();
    });
  });

  it('throws an error', () => {
    throw new Error('fail the damn test');
  });
});

  describe('async test', function() {
    it('is apparently the best test', function(done) {
      process.nextTick(function() {
        expect(true).to.eql(false);
      });
    });
  });
