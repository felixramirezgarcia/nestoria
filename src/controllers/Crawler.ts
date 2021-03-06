// Package.
import * as debug from 'debug';
import * as querystring from 'querystring';
import MongoDriver from '../lib/MongoDriver';
import { Response, Headers, get } from 'request';
import { NestoriaAPI, NestoriaBody } from '../lib/NestoriaAPI';

// Internal.
import { HouseModel } from '../models';
import { HouseType } from '../models/houses/types';

// Code.
const debugVerbose = debug('nestoria:verbose:crawler');
const debugError = debug('nestoria:error:crawler');

export interface RequestOptions {
  headers: Headers;
  port: number;
  json: boolean;
}

export class Crawler {
  private static instance: Crawler;
  private houseModel: HouseModel;

  private constructor() {}

  public static create(connection: MongoDriver): Crawler {
    if (!Crawler.instance) {
      Crawler.instance = new Crawler();
      Crawler.instance.houseModel = new HouseModel();
      Crawler.instance.houseModel.attachToDriver(connection);
    }

    return Crawler.instance;
  }

  public async processPlace(place: string) {
    debugVerbose(`processPlace input: ${place}`);

    const escapedPlace = querystring.escape(place);
    let insertedRecords = 0;
    let totalRecords = 0;
    try {
      const options: RequestOptions = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0',
        },
        json: true,
        port: 80,
      };

      const req = this.doRequest(NestoriaAPI.paginatePlace(escapedPlace, 0), options);
      let res: Response = await req;

      if (!res.body || res.statusCode !== 200) {
        return;
      }

      // after retrieve a place retrieve all its content through pagination
      const totalPages: number = res.body.response.total_pages;
      const urls: string[] = [];
      for (let i: number = 1; i <= totalPages; i++) {
        urls.push(NestoriaAPI.paginatePlace(escapedPlace, i));
      }
      
      const today = new Date();
      const reqPromises = this.promisifyRequests(urls);
      const resArr = await Promise.all(reqPromises);
      for (res of resArr) {
        const body = JSON.parse(res.body) as NestoriaBody;
        const houses: HouseType[] = [];
        for (const item of body.response.listings) {
          houses.push({
            bathroomNumber: item.bathroom_number,
            bedroomNumber: item.bedroom_number,
            carSpaces: item.car_spaces,
            comission: item.commission,
            constructionYear: item.construction_year,
            datasourceName: item.datasource_name,
            floor: item.floor,
            imgHeight: item.img_height,
            imgUrl: item.img_url,
            imgWidth: item.img_width,
            keywords: item.keywords,
            latitude: item.latitude,
            listerName: item.lister_name,
            listerUrl: item.lister_url,
            listingType: item.listing_type,
            locationAccuracy: item.location_accuracy,
            longitude: item.longitude,
            price: item.price,
            priceCurrency: item.price_currency,
            priceFormatted: item.price_formatted,
            priceHight: item.price_high,
            priceLow: item.price_low,
            propertyType: item.property_type,
            roomNumber: item.room_number,
            size: item.size,
            sizeType: item.size_type,
            summary: item.summary,
            thumbHeight: item.thumb_height,
            thumbUrl: item.thumb_url,
            thumbWidth: item.thumb_width,
            title: item.title,
            updatedInDays: item.updated_in_days,
            updatedInDaysFormatted: item.updated_in_days_formatted,
            get_day: today.getDate(),
            get_month: today.getMonth()+1,
            get_year: today.getFullYear(),
          });
        }

        const records = await this.houseModel.createHouses(houses);
        insertedRecords += records.result.ok;
        totalRecords += records.result.n;
      }
    } catch (err) {
      debugError(err);
    }

    debugVerbose(`processPlace done (${insertedRecords}/${totalRecords})`);
  }

  private promisifyRequests(urls: string[]): Array<PromiseLike<Response>> {
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
