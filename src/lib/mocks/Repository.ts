// Package.
import { Schema, Document, SchemaDefinition, SchemaOptions, Model } from 'mongoose';

// Internal.
import MongoDriver, { MongoModel } from '../MongoDriver';
import { RepositoryBase } from '../Repository';

// Code.
export interface TestDocument extends Document {
  test: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const mockedTestItem = {
  test: 1,
} as TestDocument;

const definitions: SchemaDefinition = {
  test: { type: Number, required: true },
};
const options: SchemaOptions = {
  timestamps: true,
};

const schema: Schema = new Schema(definitions, options);

export class TestModel extends MongoModel<TestDocument> {
  public repo: TestRepository;

  constructor() {
    super();
    this.modelParams.name = 'Test';
    this.modelParams.schema = schema;
    this.modelParams.collection = 'test';
  }

  public attachToDriver(driver: MongoDriver) {
    this.model = driver.attachModel<TestDocument>(this);
    this.repo = TestRepository.getInstance(this.model);
  }
}

export class TestRepository extends RepositoryBase<TestDocument> {
  private static instance: TestRepository;

  private constructor(model: Model<TestDocument>) {
    super(model);
  }

  public static getInstance(model: Model<TestDocument>): TestRepository {
    if (!TestRepository.instance) {
      TestRepository.instance = new TestRepository(model);
    }

    return TestRepository.instance;
  }
}
