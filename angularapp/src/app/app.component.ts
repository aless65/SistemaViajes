import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { EventService } from 'src/app/core/service/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public forecasts?: WeatherForecast[];
  // userLogeado = localStorage.getItem('user');
  isLoginPage: boolean = false;
  
  // constructor(
  //     http: HttpClient,
  //     private eventService: EventService
  //   ) {
  //     console.log(localStorage.getItem('user'));
  //   http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
  //     this.forecasts = result;
  //   }, error => console.error(error));
  // }
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Verificar si la ruta es 'Iniciar Sesion'
      this.isLoginPage = this.activatedRoute.snapshot.firstChild?.routeConfig?.path === 'Iniciar Sesion';
    });
  }

  title = 'angularapp';

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}