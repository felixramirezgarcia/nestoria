// Internal.
import MongoDriver from './MongoDriver';
import { Helper } from './Helper';
import { keysToOmit } from './mocks/Constants';

// Mocks.
import { mockConnection } from './mocks/MongoDriver';
import { TestModel, TestRepository, TestDocument, mockedTestItem } from './mocks/Repository';

// Code.
describe('Repository', () => {
  let driver: MongoDriver;
  let repository: TestRepository;
  let lastEntry: TestDocument;

  beforeAll(async () => {
    driver = MongoDriver.getInstance(mockConnection);
    await driver.connect();
    const model = new TestModel();
    model.attachToDriver(driver);
    repository = model.repo;
  });

  afterAll(async () => {
    await driver.disconnect();
  });

  describe('deleteAll', () => {
    it('should delete all the entries in the collection', async () => {
      const result = await repository.deleteAll();
      expect(result.ok).toBeGreaterThan(0);
    });
  });

  describe('create', () => {
    it('should create a new entry', async () => {
      const result = await repository.create(mockedTestItem);
      lastEntry = result;
      expect(Helper.deepOmit(result, keysToOmit)).toMatchSnapshot();
    });

    it('should create 2 new entries at once', async () => {
      const entries = [];
      for (let i = 2; i <= 3; i++) {
        entries.push({
          test: i,
        } as TestDocument);
      }

      const result = await repository.bulkCreate(entries);
      expect(result.insertedCount).toBe(2);
    });
  });

  describe('find', () => {
    it('should retrieve all the existent entries', async () => {
      const result = await repository.retrieve();
      expect(Helper.deepOmit(result, keysToOmit)).toMatchSnapshot();
    });

    it('should find whatever according the query conditions', async () => {
      const result = await repository.find({ test: { $gt: 0 } });
      expect(Helper.deepOmit(result, keysToOmit)).toMatchSnapshot();
    });

    it('should find an entry using its attributes', async () => {
      const result = await repository.findOne({ test: mockedTestItem.test });
      expect(Helper.deepOmit(result, keysToOmit)).toMatchSnapshot();
    });

    it('should find an entry by its id', async () => {
      const result = await repository.findById(lastEntry._id);
      expect(Helper.deepOmit(result, keysToOmit)).toMatchSnapshot();
    });
  });

  describe('update', () => {
    it('should update an entry by its id', async () => {
      const doc = {
        test: 43,
      } as TestDocument;
      const result = await repository.update(lastEntry.id, doc);
      expect(Helper.deepOmit(result, keysToOmit)).toMatchSnapshot();
    });
  });

  describe('delete', () => {
    it('should delete the updated entry', async () => {
      const result = await repository.delete(lastEntry._id);
      expect(Helper.deepOmit(result, keysToOmit)).toMatchSnapshot();
    });

    it('should flush all the collection', async () => {
      const result = await repository.deleteAll();
      expect(result.n).toBe(2);
    });
  });
});
