import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherInterface } from '../models/weather';

@Injectable({
   providedIn: 'root' 
})
export class WeatherService {
    private http = inject(HttpClient);
    private readonly API_URL = 'https://api.open-meteo.com/v1/forecast';
    getWeather(latitude: number, longitude: number): Observable<WeatherInterface>{
        const params = new HttpParams()
        .set('latitude', latitude)
        .set('longitude', longitude)
        .set('current', 'temperature_2m,wind_speed_10m,relative_humidity_2m,precipitation_probability')
        .set('wind_speed_unit', 'ms');
        return this.http.get<WeatherInterface>(this.API_URL, { params });
    }
}
