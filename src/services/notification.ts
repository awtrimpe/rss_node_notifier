import axios from 'axios';
import { XMLYTSMovie } from '../types/main';
import { stringAny } from './formatting';
import { log } from './logging';

/**
 * Will send a POST request to the Pushover API for each movie match found
 */
export function sendPush(movieArr: XMLYTSMovie[]) {
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
        log(stringAny(response.data));
      })
      .catch((error) => {
        // handle error
        log(stringAny(error));
      });
  });
}
