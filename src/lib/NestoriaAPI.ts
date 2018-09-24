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
