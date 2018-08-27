// Package.
import * as debug from 'debug';

// Internal.
import { Config } from './lib/Config';

// Code.
const debugInfo = debug('nestoria:info:app');
async function main() {
  debugInfo(Config.getEnvironment());
  process.once('exit', () => {
    debugInfo('exit');
  });
  process.once('SIGINT', () => {
    debugInfo('SIGINT');
  });
  process.once('SIGTERM', () => {
    debugInfo('SIGTERM');
  });
  process.on('uncaughtException', () => {
    debugInfo('uncaughtException');
  });
}

main();
