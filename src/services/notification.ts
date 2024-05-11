import axios from 'axios';
import { XMLYTSMovie } from '../types/main';
import { stringAny } from './formatting';
import { log } from './logging';

/**
 * Will send a POST request to the Pushover API for each movie match provided
 */
export function sendPush(movieArr: XMLYTSMovie[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const failed = [];
    for (const [i, movie] of movieArr.entries()) {
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
          failed.push(movie);
          // handle error
          log(stringAny(error));
        })
        .finally(() => {
          if (i === movieArr.length - 1 && failed.length > 0) {
            // If there are any movies left, retry after 5 minutes
            setTimeout(() => {
              sendPush(failed);
              // Retry after 5 minutes
            }, 300000);
            reject();
          } else {
            resolve();
          }
        });
    }
  });
}
