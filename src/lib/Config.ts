// Code.
export interface DBSetup {
  dbName: string;
  dbHost?: string;
  dbUser?: string;
  dbPassword?: string;
  dbPort?: number;
}

export enum Environment {
  Test = 'test',
  E2E = 'e2e',
  Development = 'development',
  Production = 'production',
}

export class Config {
  public static getEnvironment(): Environment {
    return (process.env.ENVIRONMENT as Environment) || Environment.Development;
  }

  public static getDBSetup(): DBSetup {
    return {
      dbHost: process.env.MONGO_HOST || 'localhost',
      dbName: process.env.MONGO_DB || 'test',
      dbUser: process.env.MONGO_USER || '',
      dbPassword: process.env.MONGO_PASSWORD || '',
      dbPort: Number(process.env.MONGO_PORT) || 27017,
    };
  }
}
