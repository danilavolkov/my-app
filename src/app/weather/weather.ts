import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from './services/weather-service';
import { WeatherInterface, City } from './models/weather';
import { CITIES } from './constants/cities.const';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, catchError, EMPTY } from 'rxjs';


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
  private destroyRef = inject(DestroyRef);

  readonly cities = CITIES;

  weather = signal<WeatherInterface | null>(null);
  isLoading = signal<boolean>(false);
  selectedCity = signal<City | null>(null);

  ngOnInit() {
   this.route.queryParams
   .pipe(
    takeUntilDestroyed(this.destroyRef),
    switchMap(params => {
      const cityIdFromUrl = params ['city'];
      const foundCity = this.cities.find(c => c.id === cityIdFromUrl) || this.cities[0];

      this.selectedCity.set(foundCity);
      this.isLoading.set(true);
      this.weather.set(null);

      return this.weatherService.getWeather(foundCity.lat, foundCity.lon).pipe(
        catchError(err =>{
          console.error('Ошибка при получении погоды:', err);
          this.isLoading.set(false);
          return EMPTY;
        })
      );
    })
   )
   .subscribe(data => {
    this.weather.set(data);
    this.isLoading.set(false);
   });
  }
  onCitySelect(city: City) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { city: city.id },
      queryParamsHandling: 'merge'
    });
  }
}