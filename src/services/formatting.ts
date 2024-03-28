/**
 * Returns any type of JavaScript element to a string
 */
export function stringAny(x: unknown): string {
  switch (typeof x) {
    case 'object':
      return JSON.stringify(x);
    default:
      return String(x);
  }
}

export const utils = {
  stringAny,
};
