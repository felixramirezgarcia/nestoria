// Code.
export class Config {
  static getEnvironment() {
    return process.env.ENVIRONMENT || Environment.Development;
  }

  static getDBSetup() {
    return {
      dbHost: process.env.MONGO_HOST || 'localhost',
      dbPort: parseInt(process.env.MONGO_PORT) || 27017,
      dbName: process.env.MONGO_DB || 'test',
      dbUser: process.env.MONGO_USER || '',
      dbPassword: process.env.MONGO_PASSWORD || ''
    };
  }
}
