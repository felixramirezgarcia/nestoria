// Package.
import { Document } from 'mongoose';

// Code.
export interface HouseType {
  bathroomNumber: number;
  bedroomNumber: number;
  catSpaces: number;
  comission: number;
  constructionYear: number;
  datasourceName: string;
  floor: number;
  imgHeight: number;
  imgUrl: string;
  imgWidth: number;
  keywords: string;
  latitude: number;
  listerName: string;
  listerUrl: string;
  listingType: string;
  locationAccuracy: number;
  longitude: number;
  price: number;
  priceCurrency: string;
  priceFormatted: string;
  priceHight: number;
  priceLow: number;
  propertyType: string;
  roomNumber: number;
  size: number;
  sizeType: string;
  summary: string;
  thumbHeight: number;
  thumbUrl: string;
  thumbWidth: number;
  title: string;
  updatedInDays: number;
  updatedInDaysFormatted: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HouseDocument extends HouseType, Document {}
