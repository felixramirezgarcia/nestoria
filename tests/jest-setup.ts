// Internal.
import { Environment } from '../src/lib/Config';

// Code.
process.env.ENVIRONMENT = process.env.ENVIRONMENT || Environment.Test;
jest.setTimeout(60000);
