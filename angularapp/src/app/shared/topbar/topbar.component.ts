import { Component, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/core/service/event.service';
import { ProfileOptionItem } from '../models/profileoption.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
    /**
     *
     */
    constructor(private router: Router) { }

    logout(): void {
      localStorage.removeItem('user');

      this.router.navigate(['/Iniciar Sesion']);
    }
}
