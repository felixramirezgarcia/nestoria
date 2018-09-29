// Package.
import * as debug from 'debug';

// Internal.
import MongoDriver, { MongoModel } from '../../lib/MongoDriver';
import { HouseDocument, HouseType } from './types';
import { HouseRepository } from './repository';
import { schema } from './schema';
import { InsertWriteOpResult } from 'mongodb';

// Code.
const debugError = debug('nestoria:error:model:house');

export class HouseModel extends MongoModel<HouseDocument> {
  private repo: HouseRepository;

  constructor() {
    super();
    this.modelParams.name = 'House';
    this.modelParams.schema = schema;
    this.modelParams.collection = 'houses';
  }

  public attachToDriver(driver: MongoDriver) {
    this.model = driver.attachModel<HouseDocument>(this);
    this.repo = HouseRepository.getInstance(this.model);
  }

  public async createHouse(data: HouseType): Promise<HouseDocument> {
    let output = null;

    const entry = {
      ...data,
    } as HouseDocument;

    try {
      output = await this.repo.create(entry);
    } catch (err) {
      debugError(err);
    }

    return output;
  }

  public async createHouses(data: HouseType[]): Promise<InsertWriteOpResult> {
    let output = null;

    const entries = [];

    for (const item of data) {
      entries.push({
        ...item,
      } as HouseDocument);
    }

    try {
      output = await this.repo.bulkCreate(entries);
    } catch (err) {
      debugError(err);
    }

    return output;
  }

  public async findHouse(id: string): Promise<HouseDocument> {
    let output = null;

    try {
      output = await this.repo.findById(id);
    } catch (err) {
      debugError(err);
    }

    return output;
  }

  public async getHouses(): Promise<HouseDocument[]> {
    let output = null;

    try {
      output = await this.repo.retrieve();
    } catch (err) {
      debugError(err);
    }

    return output;
  }

  public async updateHouse(id: string, attrs: HouseDocument): Promise<HouseDocument> {
    let output = null;

    try {
      output = await this.repo.update(id, attrs);
    } catch (err) {
      debugError(err);
    }

    return output;
  }

  public async deleteById(id: string): Promise<HouseDocument> {
    let output = null;

    try {
      output = this.findHouse(id);
      await this.repo.delete(id);
    } catch (err) {
      debugError(err);
    }

    return output;
  }
}

// Read Only class
Object.seal(HouseModel);
