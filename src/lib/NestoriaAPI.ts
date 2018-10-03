// Code.
const ENDPOINT = 'http://api.nestoria.es/api';
const COUNTRY = 'es';
const ENCODING = 'json';

export const NestoriaAPI = {
  paginatePlace: (name: string, pageNumber: number) =>
    `${ENDPOINT}?action=search_listings\
&country=${COUNTRY}&encoding=${ENCODING}\
&listing_type=buy\
&page=${pageNumber}\
&place_name=${name}\
&pretty=1\
&number_of_results=50\
&bedroom_min=1\
&bedroom_max=30`,
};

export interface NestoriaBody {
  request: NestoriaBodyReq;
  response: NestoriaBodyRes;
}

export interface NestoriaBodyReq {
  country: string;
  language: string;
  location: string;
  num_res: string;
  offset: number;
  output: string;
  page: number;
  pretty: string;
  product_type: string;
  property_type: string;
  size_type: string;
  size_unit: string;
  sort: string;
  bedroom_max: string;
  listing_type: string;
  bedroom_min: string;
}

export interface NestoriaBodyRes {
  application_response_code: string;
  application_response_text: string;
  attribution: {
    img_height: number;
    img_url: string;
    img_width: number;
    link_to_img: string;
  };
  created_http: string; // iso date
  created_unix: number;
  link_to_url: string;
  listings: NestoriaBodyResItemList[];
}

export interface NestoriaBodyResItemList {
  bathroom_number: number;
  bedroom_number: number;
  car_spaces: number;
  commission: number;
  construction_year: number;
  datasource_name: string;
  floor: number;
  img_height: number;
  img_url: string;
  img_width: number;
  keywords: string;
  latitude: number;
  lister_name: string;
  lister_url: string;
  listing_type: string;
  location_accuracy: number;
  longitude: number;
  price: number;
  price_currency: string;
  price_formatted: string;
  price_high: number;
  price_low: number;
  property_type: string;
  room_number: number;
  size: number;
  size_type: string;
  summary: string;
  thumb_height: number;
  thumb_url: string;
  thumb_width: number;
  title: string;
  updated_in_days: number;
  updated_in_days_formatted: string;
}
