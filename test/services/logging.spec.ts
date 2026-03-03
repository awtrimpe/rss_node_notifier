import { describe } from 'mocha';
import { SinonSpy, assert, restore, stub } from 'sinon';
import { utils } from '../../src/services/formatting';
import { log } from '../../src/services/logging';

let stringSpy: SinonSpy;

describe('logging.ts', () => {
  beforeEach(() => {
    stringSpy = stub(console, 'log');
  });

  afterEach(() => {
    restore();
  });

  describe('log()', () => {
    it('should call stringAny() before log', () => {
      const msg = 'Hello world!';
      stub(utils, 'stringAny').returns(msg);
      log(msg);
      assert.calledOnce(stringSpy);
      assert.calledWith(stringSpy, msg);
    });
  });
});
