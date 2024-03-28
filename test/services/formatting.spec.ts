import { expect } from 'chai';
import { describe } from 'mocha';
import { stringAny } from '../../src/services/formatting';

describe('formatting.ts', () => {
  describe('stringAny()', () => {
    it('should handle strings', () => {
      expect(stringAny('Hello world!')).to.equal('Hello world!');
      expect(stringAny(`Hello world!`)).to.equal('Hello world!');
      expect(stringAny('Hello world!')).to.equal('Hello world!');
    });

    it('should handle arrays', () => {
      expect(stringAny([1, 'Hello', 'World', {}])).to.equal(
        '[1,"Hello","World",{}]',
      );
    });

    it('should handle objects', () => {
      expect(stringAny({})).to.equal('{}');
      expect(stringAny({ hello: 'world' })).to.equal('{"hello":"world"}');
    });

    it('should handle numbers', () => {
      expect(stringAny(1)).to.equal('1');
      expect(stringAny(10000000)).to.equal('10000000');
    });

    it('should handle functions', () => {
      expect(stringAny(() => {})).to.equal('() => { }');
    });

    it('should handle special cases', () => {
      expect(stringAny(undefined)).to.equal('undefined');
      expect(stringAny(null)).to.equal('null');
      expect(stringAny(false)).to.equal('false');
      expect(stringAny(NaN)).to.equal('NaN');
    });
  });
});
