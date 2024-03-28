export interface XMLYTSResp {
  '?xml': {
    version: string;
    encoding: string;
  };
  rss: {
    channel: {
      'atom:link': {
        href: string;
        rel: string;
        type: string;
      };
      title: string;
      description: string;
      link: string;
      language: string;
      lastBuildDate: string; // date
      item: XMLYTSMovie[];
    };
    version: string;
    'xmlns:dc': string;
    'xmlns:content': string;
    'xmlns:atom': string;
  };
}

export interface XMLYTSMovie {
  title: string;
  description: string;
  link: string;
  guid: string;
  pubDate: string; // date
  enclosure: {
    url: string;
    type: string;
    length: string;
  };
}
