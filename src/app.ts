// Native.
import * as path from 'path';

// Package.
import * as debug from 'debug';
import MongoDriver from './lib/MongoDriver';
import { Helper } from './lib/Helper';

// Internal.
import { Crawler } from './controllers';

// Code.
const debugInfo = debug('nestoria:info:app');
const debugError = debug('nestoria:error:app');

async function main() {
  try {
    // init places.
    const places = Helper.readFileLines(path.join(__dirname, '..', 'data', 'places.txt'));

    // init db.
    const mongo = MongoDriver.getInstance({
      dbName: 'nestoria',
    });
    await mongo.connect();

    // crawl.
    debugInfo('crawling...');
    const crawler = Crawler.create(mongo);
    for (const place of places) {
      await crawler.processPlace(place);
    }

    // close.
    await mongo.disconnect();
  } catch (err) {
    debugError(err);
  }
}

main();
