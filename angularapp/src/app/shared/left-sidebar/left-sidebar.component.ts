import { AfterViewInit, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MenuItem } from '../models/menu.model';
import { EventService } from 'src/app/core/service/event.service';
import { NavigationEnd, Router } from '@angular/router';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
// import feather from "feather-icons";
import { findAllParent, findMenuItem } from '../helper/utils';
import * as feather from 'feather-icons';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})
export class LeftSidebarComponent implements OnInit{  

  isLastRouteIniciarSesion: boolean = false;

  list: MenuItem[] = [];

  usuarioString: string | null = localStorage.getItem('user'); 
  usuario: any; 

  constructor ( ) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(this.usuarioString || '');
    // const userString  = localStorage.getItem('user');
    if(this.usuario.usua_EsAdmin){
      this.usuario.role_Nombre = 'Administrador';
    }

    if(this.usuario){
      // const user = JSON.parse(userString);
      const pantallasArray = JSON.parse(this.usuario.pantallas);

        this.list = this.list.concat(pantallasArray.map((pantalla: any) => ({
          number: pantalla.pant_Id,
          name: pantalla.pant_Nombre,
          icon: pantalla.pant_Icon,
          url: pantalla.pant_URL
        })));
    }
    
  }

  // ngOnChanges(changes: SimpleChanges): void {
    
  // }
}
