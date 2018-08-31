const assert = require('chai').assert
const expect = require('chai').expect
const should = require('chai').should()


describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1,2,3].indexOf(4), -1);
    })
  })
})