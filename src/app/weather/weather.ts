import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from './services/weather-service';
import { WeatherInterface, City } from './models/weather';


@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrl: './weather.css',
})
export class Weather implements OnInit {
  private weatherService = inject(WeatherService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  weather = signal<WeatherInterface | null>(null);
  isLoading = signal<boolean>(false);
  selectedCity = signal<City | null>(null);

  cities: City[] = [
    { id:'minsk', name: 'Минск', lat: 53.9022, lon: 27.5618 },
    { id:'gomel', name: 'Гомель', lat: 52.4417, lon: 30.9833 },
    { id:'brest', name: 'Брест', lat: 52.0847, lon: 23.6569 },
    { id:'grodno', name: 'Гродно', lat: 53.6667, lon: 23.8167 },
    { id:'vitebsk', name: 'Витебск', lat: 55.1833, lon: 30.1667 },
    { id:'mogilev', name: 'Могилев', lat: 53.9089, lon: 30.3430 },
    { id:'rechitsa', name: 'Речица', lat: 52.3724, lon: 30.3880 }
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const cityIdFromUrl = params['city'];
      const foundCity = this.cities.find(c => c.id === cityIdFromUrl) || this.cities[0];

      this.selectedCity.set(foundCity);
      this.fetchWeather(foundCity);
    });
  }

  onCitySelect(city: City) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { city: city.id },
      queryParamsHandling: 'merge'
    });
  }

  private fetchWeather(city: City) {
    this.isLoading.set(true);
    this.weather.set(null);

    this.weatherService.getWeather(city.lat, city.lon).subscribe({
      next: (data) => {
        this.weather.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Ошибка при получении погоды:', err);
        this.isLoading.set(false);  
      }
    });
  }
}