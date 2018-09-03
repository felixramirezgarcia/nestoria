// Package.
import * as mongoose from 'mongoose';

// Internal.
import MongoDriver from './MongoDriver';

// Mocks.
import { mockConnection } from './mocks/MongoDriver';

// Code.
describe('MongoDriver', () => {
  let conn: mongoose.Mongoose;
  let driver: MongoDriver;

  beforeEach(() => {
    driver = MongoDriver.getInstance(mockConnection);
  });

  afterEach(async () => {
    if (driver) {
      await driver.disconnect();
    }
  });

  it('should connect if mongodb server is up', async () => {
    conn = await driver.connect();
    expect(conn).toBeInstanceOf(mongoose.Mongoose);
  });

  it('should disconnect if a connection was stablished', async () => {
    conn = await driver.connect();
    await driver.disconnect();
    expect(driver.getConnector()).toBeNull();
  });
});
