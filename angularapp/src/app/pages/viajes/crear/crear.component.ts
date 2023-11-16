import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Viajes } from '../../Models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponentViajes {
  userString: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userString);
  returnUrl: string = '/Viajes';
  pageTitle: BreadcrumbItem[] = [];
  validationGroup1!: FormGroup;
  viaje: Viajes = new Viajes(); 
  sucursal: Select2Data = [];
  transportista: Select2Data = [];
  colaboradores: Select2Data = [];
  colaboradoresTabla: any = [];
  tablaFiltrada: any;

  constructor (
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.viaje.viaj_UsuaCreacion = this.user.usua_Id;
    this.viaje.viaj_TotalKm = 0;

    this.pageTitle = [{ label: 'Lista', path: '/' }, { label: 'Crear', path: '/', active: true }];
    
    // initialize form config
    this.validationGroup1 = this.fb.group({
      FechaYHora: ['', Validators.required],
      Sucursal: [0, Validators.required],
      Transportista: [0, Validators.required],
      Colaboradores: [[], Validators.required],
    });

    this.http.get('/Transportistas/Listado').subscribe((response: any) => {
      let optionsTransportistas = response.data.map((item: any) => ({
        value: item.tran_Id,
        label: `${item.tran_Nombres} ${item.tran_Apellidos}`
      }));

      this.transportista = [{
        label: 'Escoja un transportista',
        options: optionsTransportistas
      }]
    }, error => console.error(error));

    this.http.get('/Sucursales/Listado').subscribe((response: any) => {
      let optionsSucursales = response.data.map((item: any) => ({
        value: item.sucu_Id,
        label: item.sucu_Nombre
      }));

      this.sucursal = [{
        label: 'Escoja una sucursal',
        options: optionsSucursales
      }]
    }, error => console.error(error));
    
  }

  filtrarColaboradores(){
    if(this.viaje.sucu_Id !== undefined){
      this.http.get('/ColaboradoresXSucursales/Listado?id=' + this.viaje.sucu_Id).subscribe((response: any) => {
        let optionsColaboradores = response.data.map((item: any) => ({
          value: item.cola_Id,
          label: `${item.cola_Nombres} ${item.cola_Apellidos}`
        }));
  
        this.colaboradores = [{
          label: 'Escoja un colaborador',
          options: optionsColaboradores
        }]
  
        this.colaboradoresTabla = response.data.map((item: any) => ({
          id: item.cola_Id,
          nombre: `${item.cola_Nombres} ${item.cola_Apellidos}`,
          distancia: item.suco_DistanciaKm
        }));
  
      }, error => console.error(error));
    }
  }

  filtrarTabla(){

    this.tablaFiltrada = this.colaboradoresTabla.filter((item: any) => 
      this.viaje.detalles.some((detalle: any) => detalle === item.id)
    )
    
    if(this.viaje.viaj_TotalKm !== undefined){
      this.viaje.viaj_TotalKm = this.tablaFiltrada.reduce((sum: any, item: any) => sum + item.distancia, 0);

      if(this.viaje.viaj_TotalKm !== undefined && this.viaje.viaj_TotalKm > 100){
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡La distancia total no puede pasar de 100 kilómetros!',
          icon: 'warning',
          background: '#f6f6baf2'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }

    }
  }

  get form1() { return this.validationGroup1.controls; }

  validarYGuardar() {
    
     if (this.validationGroup1.invalid || (this.viaje.viaj_TotalKm !== undefined && this.viaje.viaj_TotalKm > 100) ) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        titleText: '¡Llene todos los campos correctamente!',
        icon: 'warning',
        background: '#f6f6baf2'
      }).then(() => {
        // Acción luego de cerrarse el toast
      });
      // El formulario tiene errores de validación, pues mostrar un mensaje de error o alguna cosa ombe... aquí
      Object.keys(this.validationGroup1.controls).forEach(field => {
        const control = this.validationGroup1.get(field);
        if (control?.invalid) {
          const errors = control.errors;
          console.log(`Error en el campo ${field}:`, errors);
        }
      });
    }
    else {
      // Si todos los campos del formulario son válidos, llamar a la función de guardar
      this.Guardar();
     
    }
    
  }

  Guardar(){
    let detallesJSON;
    detallesJSON = {
      colaboradores: this.viaje.detalles.map((id: any) => {
        return {cola_Id: id}
      })
    };


    // this.viaje.detalles = JSON.stringify(detallesJSON);
    const mockData = {
      viaj_Id: 0,
      viaj_FechaYHora: this.viaje.viaj_FechaYHora,
      viaj_TotalKm: this.viaje.viaj_TotalKm,
      sucu_Id: this.viaje.sucu_Id,
      tran_Id: this.viaje.tran_Id,
      viaj_Estado: true,
      viaj_UsuaCreacion: this.viaje.viaj_UsuaCreacion,
      viaj_FechaCreacion: "2023-11-15T05:07:27.227Z",
      viaj_UsuaModificacion: 0,
      viaj_FechaModificacion: "2023-11-15T05:07:27.227Z",
      tran_NombreCompleto: "string",
      sucu_Nombre: "string",
      detalles: JSON.stringify(detallesJSON),
      usuarioCreacion: "string",
      usuarioModificacion: "string"

    }

    this.http.post('/Viajes/Insertar', mockData)
    .subscribe((data: any) => {

      if(data.code == 409){
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: `¡${data.message}!`,
          icon: 'warning',
          background: '#fff0f0f5'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }
      else if(data.code == 500){
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1700,
          timerProgressBar: true,
          titleText: '¡Ha ocurrido en error inesperado!',
          icon: 'error',
          background: '#fff0f0f5'
        }).then(() => {
          // Acción luego de cerrarse el toast
        });
      }
      else if(data.success){
        Swal.fire({
          toast: true,
          position: 'top-end',
          title: '¡Perfecto!',
          text: 'El registro se guardó con éxito!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1850,
          timerProgressBar: true
        }).then(() => {
        });
        this.router.navigate([this.returnUrl]);
      }
    }, error => console.error(error));
  }

  Volver(){
   this.router.navigate([this.returnUrl]);
  }
}
