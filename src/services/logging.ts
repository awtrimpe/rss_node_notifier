import { stringAny } from './formatting';

/**
 * Logs to the console
 */
export function log(x: unknown) {
  console.log(stringAny(x));
}

export const utils = {
  log,
};
