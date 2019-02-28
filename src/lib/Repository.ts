// Package.
import { Document, Model, Types } from 'mongoose';
import { InsertWriteOpResult } from 'mongodb';

// Code.
export interface Read<T> {
  retrieve: () => Promise<T[]>;
  findById: (id: string) => Promise<T>;
  findOne(cond?: any): Promise<T>;
  find(cond: any, fields: any, options: any): Promise<T[]>;
}

export interface Write<T> {
  create: (item: T) => Promise<T>;
  bulkCreate: (items: T[]) => Promise<InsertWriteOpResult>;
  update: (id: string, item: T) => Promise<T>;
  delete: (id: string) => Promise<T>;
}

export interface BulkDelete {
  n: number;
  ok: number;
}

export class RepositoryBase<T extends Document> implements Read<T>, Write<T> {
  private _model: Model<Document>;

  constructor(schemaModel: Model<Document>) {
    this._model = schemaModel;
  }

  public async create(item: T): Promise<T> {
    let output = null;

    try {
      output = (await this._model.create(item)) as T;
    } catch (err) {
      throw err;
    }

    return output;
  }

  public async bulkCreate(items: T[]): Promise<InsertWriteOpResult> {
    let output = null;

    try {
      output = await this._model.collection.insertMany(items);
    } catch (err) {
      throw err;
    }

    return output;
  }

  public async update(id: string, item: T): Promise<T> {
    let output = null;

    try {
      const _id: Types.ObjectId = this.toObjectId(id);
      await this._model.update({ _id }, item);
      output = (await this._model.findById({ _id })) as T;
    } catch (err) {
      throw err;
    }

    return output;
  }

  public async delete(id: string): Promise<T> {
    let output = null;

    try {
      output = (await this._model.findById(id)) as T;
      await this._model.remove({ _id: id });
    } catch (err) {
      throw err;
    }

    return output;
  }

  public async retrieve(): Promise<T[]> {
    let output: T[] = null;

    try {
      const conditions = {};
      output = (await this._model.find(conditions)) as T[];
    } catch (err) {
      throw err;
    }

    return output;
  }

  public async findById(_id: string): Promise<T> {
    let output = null;

    try {
      output = (await this._model.findById(_id)) as T;
    } catch (err) {
      throw err;
    }

    return output;
  }

  public async findOne(cond?: any): Promise<T> {
    let output = null;

    try {
      output = (await this._model.findOne(cond)) as T;
    } catch (err) {
      throw err;
    }

    return output;
  }

  public async find(cond?: any, options?: any): Promise<T[]> {
    let output = null;

    try {
      output = (await this._model.find(cond, options)) as T[];
    } catch (err) {
      throw err;
    }

    return output;
  }

  private toObjectId(_id: string): Types.ObjectId {
    return Types.ObjectId.createFromHexString(_id);
  }
}
