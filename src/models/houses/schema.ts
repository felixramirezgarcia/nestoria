// Package.
import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';

// Code.
const definitions: SchemaDefinition = {
  bathroomNumber: { type: Number, required: false },
  bedroomNumber: { type: Number, required: false },
  carSpaces: { type: Number, required: false },
  comission: { type: Number, required: false },
  constructionYear: { type: Number, required: false },
  datasourceName: { type: String, required: false },
  floor: { type: Number, required: false },
  imgHeight: { type: Number, required: false },
  imgUrl: { type: String, required: false },
  imgWidth: { type: Number, required: false },
  keywords: { type: String, required: false },
  latitude: { type: Number, required: false },
  listerName: { type: String, required: false },
  listerUrl: { type: String, required: false },
  listingType: { type: String, required: false },
  locationAccuracy: { type: Number, required: false },
  longitude: { type: Number, required: false },
  price: { type: Number, required: false },
  priceCurrency: { type: String, required: false },
  priceFormatted: { type: String, required: false },
  priceHight: { type: Number, required: false },
  priceLow: { type: Number, required: false },
  propertyType: { type: String, required: false },
  roomNumber: { type: Number, required: false },
  size: { type: Number, required: false },
  sizeType: { type: String, required: false },
  summary: { type: String, required: false },
  thumbHeight: { type: Number, required: false },
  thumbUrl: { type: String, required: false },
  thumbWidth: { type: Number, required: false },
  title: { type: String, required: false },
  updatedInDays: { type: Number, required: false },
  updatedInDaysFormatted: { type: String, required: false },
  get_day: { type: Number, required: false },
  get_month: { type: Number, required: false },
  get_year: { type: Number, required: false },
};
const options: SchemaOptions = {
  timestamps: true,
};

export const schema: Schema = new Schema(definitions, options);

