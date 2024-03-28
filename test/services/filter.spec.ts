import { expect } from 'chai';
import { rssFilter } from '../../src/services/filter';
import { XMLYTSResp } from '../../src/types/main';
import { xlmJSON } from '../helpers/list';

describe('filter.ts', () => {
  describe('rssFilter()', () => {
    it('should return only a single movie from the last hour', () => {
      expect(rssFilter(xlmJSON).length).to.equal(1);
      expect(rssFilter(xlmJSON)[0].title).to.include(
        'Snoopy Presents: Welcome Home, Franklin',
      );
    });

    it('should not return expired movies', () => {
      const copy: XMLYTSResp = JSON.parse(JSON.stringify(xlmJSON));
      copy.rss.channel.item.pop();
      expect(rssFilter(copy).length).to.equal(0);
    });
  });
});
