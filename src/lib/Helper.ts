// Native.
import * as fs from 'fs';
import * as path from 'path';

// Code.
export class Helper {
  public static readFileLines(filePath: string): string[] {
    return fs
      .readFileSync(path.resolve(filePath))
      .toString()
      .split('\n');
  }
}
