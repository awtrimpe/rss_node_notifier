import axios from 'axios';
import { XMLYTSMovie } from '../types/main';
import { stringAny } from './formatting';
import { log } from './logging';

/**
 * Will send a POST request to the Pushover API for each movie match provided
 */
export function sendPush(movieArr: XMLYTSMovie[]) {
  let movieArrCopy = JSON.parse(JSON.stringify(movieArr));
  for (const movie of movieArr) {
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
        // Remove from copied array
        movieArrCopy = movieArrCopy.filter((m) => m.title !== movie.title);
        // handle success
        log(stringAny(response.data));
      })
      .catch((error) => {
        // handle error
        log(stringAny(error));
      });
  }
  // If there are any movies left, retry after 5 minutes
  if (movieArrCopy && movieArrCopy.length > 0) {
    setTimeout(() => {
      sendPush(movieArrCopy);
      // Retry after 5 minutes
    }, 300000)
  }
}
