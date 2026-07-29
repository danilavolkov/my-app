export interface City {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export interface WeatherInterface {
    latitude: number;
    longitude: number;
    current_units: {
        temperature_2m: string;
        wind_speed_10m: string;
        relative_humidity_2m: string;
        precipitation_probability: string;
    };
    current: {
        time: string;
        temperature_2m: number;
        wind_speed_10m: number;
        relative_humidity_2m: number;
        precipitation_probability: number;
    };
}
