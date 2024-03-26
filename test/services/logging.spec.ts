import { describe } from 'mocha';
import { assert, spy } from 'sinon';
import { utils } from '../../src/services/formatting';
import { log } from '../../src/services/logging';

describe('logging.ts', () => {
  describe('log()', () => {
    it('should call stringAny() before log', () => {
      const stringSpy = spy(utils, 'stringAny');
      const msg = 'Hello world!';
      log(msg);
      assert.calledWith(stringSpy, msg);
    });
  });
});
