// Package.
import * as querystring from 'querystring';
import { Response, Headers, get } from 'request';

// Internal.
import { NestoriaAPI } from '../lib/NestoriaAPI';

// Code.
export interface RequestOptions {
  headers: Headers;
  port: number;
  json: boolean;
}

export class Crawler {
  private static instance: Crawler;

  private constructor() {}

  public static create(): Crawler {
    if (!Crawler.instance) {
      Crawler.instance = new Crawler();
    }

    return Crawler.instance;
  }

  public async processPlace(place: string) {
    const escapedPlace = querystring.escape(place);
    try {
      const options: RequestOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
        },
        json: true,
        port: 80,
      };

      const req = this.doRequest(NestoriaAPI.searchPlace(escapedPlace), options);
      const res: Response = await req;

      if (!res.body || res.statusCode !== 200) {
        return;
      }

      // after retrieve a place retrieve all its content through pagination
      const totalPages: number = res.body.total_pages;
      const urls: string[] = [];
      for (let i: number = 1; i <= totalPages; i++) {
        urls.push(NestoriaAPI.paginatePlace(i));
      }

      const reqPromises = this.promisifyRequests(urls);
      const resArr = await Promise.all(reqPromises);
      console.log(resArr);

      // TODO: save the results
    } catch (err) {
      console.error(err);
    }
  }

  private promisifyRequests(urls: string[]): Array<Promise<Response>> {
    const self = this;
    return urls.map(url => self.doRequest(url));
  }

  private doRequest(url: string, options?: RequestOptions): Promise<Response> {
    return new Promise((resolve, reject) => {
      get(
        {
          url,
          ...options,
        },
        (err: Error, res: Response) => {
          if (err) {
            return reject(err);
          }

          return resolve(res);
        }
      );
    });
  }
}
