// Package.
import { Model } from 'mongoose';

// Internal.
import { RepositoryBase } from '../../lib/Repository';
import { HouseDocument } from './types';

// Code.
export class HouseRepository extends RepositoryBase<HouseDocument> {
  private static instance: HouseRepository;

  private constructor(model: Model<HouseDocument>) {
    super(model);
  }

  public static getInstance(model: Model<HouseDocument>): HouseRepository {
    if (!HouseRepository.instance) {
      HouseRepository.instance = new HouseRepository(model);
    }

    return HouseRepository.instance;
  }
}
