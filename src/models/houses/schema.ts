// Package.
import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';

// Code.
const definitions: SchemaDefinition = {
  bathroomNumber: { type: Number, required: true },
  bedroomNumber: { type: Number, required: true },
  catSpaces: { type: Number, required: true },
  comission: { type: Number, required: true },
  constructionYear: { type: Number, required: true },
  datasourceName: { type: String, required: true },
  floor: { type: Number, required: true },
  imgHeight: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  imgWidth: { type: Number, required: true },
  keywords: { type: String, required: true },
  latitude: { type: Number, required: true },
  listerName: { type: String, required: true },
  listerUrl: { type: String, required: true },
  listingType: { type: String, required: true },
  locationAccuracy: { type: Number, required: true },
  longitude: { type: Number, required: true },
  price: { type: Number, required: true },
  priceCurrency: { type: String, required: true },
  priceFormatted: { type: String, required: true },
  priceHight: { type: Number, required: true },
  priceLow: { type: Number, required: true },
  propertyType: { type: String, required: true },
  roomNumber: { type: Number, required: true },
  size: { type: Number, required: true },
  sizeType: { type: String, required: true },
  summary: { type: String, required: true },
  thumbHeight: { type: Number, required: true },
  thumbUrl: { type: String, required: true },
  thumbWidth: { type: Number, required: true },
  title: { type: String, required: true },
  updatedInDays: { type: Number, required: true },
  updatedInDaysFormatted: { type: String, required: true },
};
const options: SchemaOptions = {
  timestamps: true,
};

export const schema: Schema = new Schema(definitions, options);
