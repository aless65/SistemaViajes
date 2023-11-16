import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Viajes } from '../../Models';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponentViajes {

  pageTitle: BreadcrumbItem[] = [];
  viajeId: number = 0;
  viaje: Viajes = new Viajes(); 

  constructor(
    private http:HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: any) => {
      this.viajeId = params['id'];
      // Aquí hacer lo que necesite con el ID 
    });

    this.pageTitle = [{ label: 'Viajes', path: '/' }, { label: 'Detalles', path: '/', active: true }];
    this.Datos();
  }

  Datos() {
  
    this.http.get('/Viajes/Find?id=' + this.viajeId)
      .subscribe((data: any) => {
        console.log(data.data);
  
        this.viaje = data.data;

        if (!this.viaje.viaj_FechaYHora) {
          this.viaje.viaj_FechaYHora = 'Invalid Date';
        }

        const date = new Date(this.viaje.viaj_FechaYHora);
  
        if (isNaN(date.getTime())) {
            // Handle invalid date string
            this.viaje.viaj_FechaYHora = 'Invalid Date';
        }

        const formattedDate = new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(date);

        this.viaje.viaj_FechaYHora = formattedDate;
  
        const fechaCrea = this.viaje.viaj_FechaCreacion ? formatDate(this.viaje.viaj_FechaCreacion, 'yyyy-MM-dd', 'en-US') : '';
        const fechaModif = this.viaje.viaj_FechaModificacion ? formatDate(this.viaje.viaj_FechaModificacion, 'yyyy-MM-dd', 'en-US') : '';
 
        this.viaje.viaj_FechaCreacion = fechaCrea;
        this.viaje.viaj_FechaModificacion = fechaModif;

        const detallesObjeto = JSON.parse(this.viaje.detalles);

        this.viaje.detalles = detallesObjeto;
      }, error => console.error(error));
  }
}
