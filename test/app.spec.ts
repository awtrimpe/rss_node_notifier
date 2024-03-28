import axios from 'axios';
import { afterEach, describe, it } from 'mocha';
import {
  SinonFakeTimers,
  assert,
  restore,
  spy,
  stub,
  useFakeTimers,
} from 'sinon';
import { startLoop } from '../src/app';
// import * as logging from '../src/services/logging';
import { xlmJSON } from './helpers/list';

let clock: SinonFakeTimers;

describe('app.ts', () => {
  beforeEach(() => {
    clock = useFakeTimers();
    spy(console, 'log');
  });

  afterEach(() => {
    restore();
  });

  describe('startLoop()', () => {
    it('should call axios with provided URL, and all subsequent \
    functions with the response of the last', () => {
      const axiosSpy = stub(axios, 'get').resolves({ data: xlmJSON });
      startLoop();
      assert.calledWith(axiosSpy, 'https://yts.mx/rss');
      // TODO: Finish
    });

    it('should call axios twice after 1 hour', () => {
      const axiosSpy = stub(axios, 'get').resolves({ data: xlmJSON });
      startLoop();
      clock.tick(3600001);
      assert.calledTwice(axiosSpy);
    });

    it('should call console with error message', () => {
      // const loggingSpy = spy(logging, 'log');
      stub(axios, 'get').rejects('bad format');
      startLoop();
      // assert.calledOnce(loggingSpy);
      // assert.calledWith(loggingSpy, 'bad error');
      // TODO: Find way to spy on ES Module exports
    });
  });
});
