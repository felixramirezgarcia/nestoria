// Native.
import * as fs from 'fs';
import * as path from 'path';

// Package.
import * as _ from 'lodash';

// Code.
export class Helper {
  public static readFileLines(filePath: string): string[] {
    return fs
      .readFileSync(path.resolve(filePath))
      .toString()
      .split('\n');
  }

  public static deepOmit(object: any, keysToOmit: string[]) {
    const keysToOmitIndex = _.keyBy(Array.isArray(keysToOmit) ? keysToOmit : [keysToOmit]);

    function omitFromObject(obj: any) {
      return _.transform(obj, (result: any, value: any, key: string) => {
        if (key in keysToOmitIndex) {
          return;
        }
        result[key] = _.isObject(value) ? omitFromObject(value) : value;
      });
    }

    return omitFromObject(object);
  }
}
