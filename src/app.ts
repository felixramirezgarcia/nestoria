// Native.
import * as path from 'path';

// Package.
import * as debug from 'debug';

// Internal.
import { Crawler } from './controllers';
import { Helper } from './lib/Helper';

// Code.
const debugInfo = debug('nestoria:info:app');
const debugError = debug('nestoria:error:app');

async function main() {
  debugInfo('starting to parse locations');

  try {
    const places = Helper.readFileLines(path.join(__dirname, '..', 'data', 'places.txt'));

    debugInfo('crawling...');
    const crawler = Crawler.create();
    for (const place of places) {
      await crawler.processPlace(place);
    }
  } catch (err) {
    debugError(err);
  }
}

main();
