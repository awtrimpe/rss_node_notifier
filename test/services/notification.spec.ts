import axios from 'axios';
import { expect } from 'chai';
import { describe } from 'mocha';
import { assert, restore, spy, stub, SinonSpy } from 'sinon';
import { utils as util } from '../../src/services/formatting';
import { utils } from '../../src/services/logging';
import { sendPush } from '../../src/services/notification';
import { xlmJSON } from '../helpers/list';

describe('notification.ts', () => {
  afterEach(() => {
    restore();
  });

  describe('sendNotification()', () => {
    it('should send a POST to Pushover for single item in array', () => {
      const postSpy = stub(axios, 'post').resolves({ data: {} });
      const singleEntry = [
        JSON.parse(JSON.stringify(xlmJSON)).rss.channel.item[0],
      ];
      sendPush(singleEntry);
      expect(postSpy.calledOnce).to.be.true;
      assert.calledWith(postSpy, 'https://api.pushover.net/1/messages.json', {
        token: process.env.PUSHOVER_TOKEN,
        user: process.env.PUSHOVER_USER,
        message: singleEntry[0].description,
        title: singleEntry[0].title,
        timestamp: singleEntry[0].pubDate,
        html: 1,
      });
    });

    it('should send a POST to Pushover for multiple items in array', () => {
      const postSpy = stub(axios, 'post').resolves({ data: {} });
      sendPush(xlmJSON.rss.channel.item);
      expect(postSpy.called).to.be.true;
      expect(postSpy.callCount).to.equal(xlmJSON.rss.channel.item.length);
    });

    it('should call console with error', () => {
      const logSpy = spy(utils, 'log');
      const stringStub = stub(util, 'stringAny');
      const msg = { error: 'Bad error' };
      stub(axios, 'post').rejects(msg);
      sendPush(xlmJSON.rss.channel.item);
      expect(logSpy.calledOnce).to.be.true;
      expect(stringStub.calledOnceWith(msg)).to.be.true;
    });
  });
});
