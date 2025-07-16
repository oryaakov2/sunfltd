import data from "../mockdata/cities.json";
import { City } from "../types";

export const cities = data.cities as City[];

export const continents = [
  { label: 'All Continents', value: '' },
  { label: 'Africa', value: 'africa' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'North America', value: 'north america' },
  { label: 'South America', value: 'south america' },
  { label: 'Oceania', value: 'oceania' },
  { label: 'Antarctica', value: 'antarctica' },
];