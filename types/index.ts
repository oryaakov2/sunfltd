export interface Coordinates {
  lat: number;
  lng: number;
}

export interface City {
  name: string;
  continent: string;
  active: boolean;
  country: string;
  description: string;
  image: string;
  coords: Coordinates;
  favorite?: boolean;
  distance?: number;
}

export interface CitiesData {
  cities: City[];
}

export interface SearchQuery {
  name: string;
  continent: string;
}

export interface InputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (updateFn: (prevState: SearchQuery) => SearchQuery) => void;
};

export type Units = 'C' | 'F';

export interface WeatherData {
  date: string;
  temp: number;
  weather: string;
  description: string;
  icon: string;
}

export type WeatherDataArray = WeatherData[];
