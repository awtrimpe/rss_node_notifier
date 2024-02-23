import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { rssFilter } from './services/filter';
import { sendPush } from './services/notification';
import { XMLYTSResp } from './types/main';

/**
 * Executes a loop that will execute every hour
 */
export function startLoop() {
  const getMovies = () => {
    axios
      .get('https://yts.mx/rss')
      .then((resp) => {
        const xml = new XMLParser({
          attributeNamePrefix: '',
          textNodeName: '$text',
          ignoreAttributes: false,
        });

        const result: XMLYTSResp = xml.parse(resp.data);
        sendPush(rssFilter(result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getMovies();
  // Start check for every hour
  setInterval(() => {
    getMovies();
  }, 3600000);
}

try {
  startLoop();
} catch (err) {
  console.log(err);
  startLoop();
}
