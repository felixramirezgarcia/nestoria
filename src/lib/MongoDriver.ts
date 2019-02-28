// Package.
import * as mongoose from 'mongoose';
import * as debug from 'debug';

// Internals.
import { DBSetup } from './Config';

// Code.
const debugVerbose = debug('driver:verbose:mongo');
const debugError = debug('driver:error:mongo');

export type MongoDriverParams = DBSetup;

export interface MongoModelParams {
  name: string;
  schema?: mongoose.Schema;
  collection?: string;
  skipInit?: boolean;
}

export abstract class MongoModel<T extends mongoose.Document> {
  protected modelParams: MongoModelParams;
  protected model: mongoose.Model<T>;

  constructor() {
    this.modelParams = {
      name: 'Collection',
      skipInit: true,
    };
  }

  get params(): MongoModelParams {
    return this.modelParams;
  }

  protected abstract attachToDriver(driver: MongoDriver): void;
}

export default class MongoDriver {
  private static instance: MongoDriver;
  private params: MongoDriverParams;
  private connection: mongoose.Mongoose;

  private constructor(config: MongoDriverParams) {
    this.params = config;
    this.params.dbHost = config.dbHost ? config.dbHost : 'localhost';
    this.params.dbPort = config.dbPort ? config.dbPort : 27017;
    this.params.dbUser = config.dbUser ? config.dbUser : '';
    this.params.dbPassword = config.dbPassword ? config.dbPassword : '';
    this.registerEvents();
  }

  public static getInstance(config: MongoDriverParams): MongoDriver {
    if (!MongoDriver.instance) {
      MongoDriver.instance = new MongoDriver(config);
    }

    return MongoDriver.instance;
  }

  public async connect(): Promise<mongoose.Mongoose> {
    if (this.connection == null) {
      const options: mongoose.ConnectionOptions = {
        keepAlive: true,
        connectTimeoutMS: 30000,
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        // Never stop trying to reconnect
        reconnectTries: Number.MAX_VALUE,
        useNewUrlParser: true,
      };

      try {
        const userPassBind =
          this.params.dbUser && this.params.dbPassword ? `${this.params.dbUser}:${this.params.dbPassword}@` : '';

        if (process.env.MONGO_DEBUG) {
          mongoose.set('debug', true);
        }

        this.connection = await mongoose.connect(
          `mongodb://${userPassBind}${this.params.dbHost}:${this.params.dbPort}/${this.params.dbName}`,
          options
        );
      } catch (err) {
        debugError(err);
      }
    }
    return this.connection;
  }

  public attachModel<T extends mongoose.Document>(model: MongoModel<T>): mongoose.Model<T> {
    const m: mongoose.Model<T> = this.connection.connection.model<T>(
      model.params.name,
      model.params.schema,
      model.params.collection
    );

    return m;
  }

  public async disconnect(cb?: () => void): Promise<void> {
    if (this.connection) {
      if (cb) {
        await this.connection.disconnect(cb);
      } else {
        await this.connection.disconnect();
      }
      this.connection = null;
    }
  }

  public getConnector(): mongoose.Mongoose {
    return this.connection;
  }

  private registerEvents(): void {
    mongoose.connection.on('connected', () => {
      debugVerbose(`Mongoose connected to ${this.params.dbName}`);
    });
    mongoose.connection.on('disconnected', () => {
      debugVerbose(`Mongoose disconnected from ${this.params.dbName}`);
    });
    mongoose.connection.on('error', (err: Error) => {
      debugVerbose(`Mongoose has errors ${err.stack}`);
    });
  }
}
