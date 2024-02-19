import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { XMLYTSMovie, XMLYTSResp } from 'types/main';

/**
 * Executes a loop that will execute every hour
 */
function startLoop() {
  const getMovies = () => {
    axios.get('https://yts.mx/rss').then((resp) => {
      const xml = new XMLParser({
        attributeNamePrefix: '',
        textNodeName: '$text',
        ignoreAttributes: false,
      });

      const result: XMLYTSResp = xml.parse(resp.data);
      sendPush(rssFilter(result));
    });
  };
  getMovies();
  // Start check for every hour
  setInterval(() => {
    getMovies();
  }, 3600000);
}

/**
 * Filters out any movies not within the last year, current year, or upcoming
 * year, and any movie published longer than the last time check (1 hour ago).
 */
function rssFilter(resp: XMLYTSResp) {
  const year = new Date().getFullYear();
  return resp.rss.channel.item.filter((movie) => {
    return (
      (movie.title.includes(`(${year}) [2160p]`) ||
        movie.title.includes(`(${year - 1}) [2160p]`) ||
        movie.title.includes(`(${year + 1}) [2160p]`)) &&
      new Date(movie.pubDate) > new Date(Date.now() - 1000 * 60 * 60)
    );
  });
}

/**
 * Will send a POST request to the Pushover API for each movie match found
 */
function sendPush(movieArr: XMLYTSMovie[]) {
  movieArr.forEach((movie) => {
    axios
      .post('https://api.pushover.net/1/messages.json', {
        token: process.env.PUSHOVER_TOKEN,
        user: process.env.PUSHOVER_USER,
        message: movie.description,
        title: movie.title,
        timestamp: movie.pubDate,
        html: 1,
      })
      .then((response) => {
        // handle success
        console.log(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  });
}

try {
  startLoop();
} catch (err) {
  console.log(err);
  startLoop();
}
