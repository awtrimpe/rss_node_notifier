import axios from 'axios';
import { expect } from 'chai';
import { afterEach, describe, it } from 'mocha';
import { assert, restore, spy } from 'sinon';
import { startLoop } from '../src/app';

describe('app.ts', () => {
  afterEach(() => {
    restore();
  });

  describe('startLoop()', () => {
    it('should call axios with provided URL, and all subsequent \
    functions with the response of the last', () => {
      const axiosSpy = spy(axios, 'get');
      startLoop();
      assert.calledWith(axiosSpy, 'https://yts.mx/rss');
      // TODO: Finish
    });
  });

  describe('rssFilter()', () => {
    it('should return only a single movie from the array', () => {
      expect('Alex').to.be.a('string');
    });
  });

  describe('sendPush()', () => {
    it('should ', () => {
      expect('Alex').to.be.a('string');
    });
  });
});
