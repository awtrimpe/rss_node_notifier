import { XMLYTSResp } from '../types/main';

/**
 * Filters out any movies not within the last year, current year, or upcoming
 * year, and any movie published longer than the last time check (1 hour ago).
 */
export function rssFilter(resp: XMLYTSResp) {
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
