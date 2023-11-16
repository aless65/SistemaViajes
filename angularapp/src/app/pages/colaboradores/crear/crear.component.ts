import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Colaboradores } from '../../Models';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponentColaboradores {

  public sucursalesForm: FormGroup;
  userString: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userString);
  returnUrl: string = '/Colaboradores';
  pageTitle: BreadcrumbItem[] = [];
  validationGroup1!: FormGroup;
  colaborador: Colaboradores = new  Colaboradores(); 
  municipio: Select2Data = [];
  sucursal: Select2Data = [];
  isFechaInvalida: boolean = false;

  constructor (
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http:HttpClient
  ) {
    this.sucursalesForm = this.fb.group({
      tableRows: this.fb.array([],[Validators.required])
    });
    this.addRow();
   }

  createFormGroup(): FormGroup {
    return this.fb.group({
      sucu_Id: ['',[Validators.required, RxwebValidators.unique()]],
      suco_DistanciaKm: ['',[Validators.required, Validators.min(1), Validators.max(50)]]
    });
  }

  get getFormControls() {
    const control = this.sucursalesForm.get('tableRows') as FormArray;
    return control;
  }

  addRow() {
    const control =  this.sucursalesForm.get('tableRows') as FormArray;
    control.push(this.createFormGroup());
  }

  checkAll(checkVal: boolean) {
    
    this.getFormControls.controls.forEach(formGroup => {
      formGroup.get('ischecked')?.setValue(checkVal);
    });
  }

  removeSucursal(index:number) {
    const control =  this.sucursalesForm.get('tableRows') as FormArray;
    control.removeAt(index);
  }
  

  ngOnInit(): void {
    this.colaborador.cola_UsuaCreacion = this.user.usua_Id;

    this.pageTitle = [{ label: 'Lista', path: '/' }, { label: 'Crear', path: '/', active: true }];
    
    // initialize form config
    this.validationGroup1 = this.fb.group({
      Nombres: ['', Validators.required],
      Apellidos: ['', Validators.required],
      Identidad: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(13), Validators.minLength(13)]],
      Direccion: ['', Validators.required],
      Muni: [0, Validators.required],
      FechaNacimiento: ['', Validators.required],
      Sexo: ['', Validators.required],
      Sucursales: [''],
    });

    this.http.get('/Municipios/Listado').subscribe((response: any) => {
      let depaLabels: string[] = [];
      let options: { [key: string]: any[] } = {};
    
      response.data.forEach((item: any) => {
        const depaNombre: string = item.depa_Nombre;
        const muniId: string = item.muni_Id;
        const muniNombre: string = item.muni_Nombre;
    
        if (!depaLabels.includes(depaNombre)) {
          depaLabels.push(depaNombre);
          options[depaNombre] = [];
        }
    
        options[depaNombre].push({
          value: muniId,
          label: muniNombre
        });
      });
    
      this.municipio = depaLabels.map((depaNombre: string) => ({
        label: depaNombre,
        options: options[depaNombre]
      }));
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
  
  // convenience getter for easy access to form fields
  get form1() { return this.validationGroup1.controls; }

  validarYGuardar() {
    this.isFechaInvalida = false;
    
     if (this.validationGroup1.invalid || this.sucursalesForm.invalid) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1700,
        timerProgressBar: true,
        titleText: '¡Llene todos los campos!',
        icon: 'warning',
        background: '#f6f6baf2'
      }).then(() => {
        // Acción luego de cerrarse el toast
      });
      // El formulario tiene errores de validación, pues mostrar un mensaje de error o alguna cosa ombe... aquí
      // console.log(this.usucrea);
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
    const mockData = {
      cola_Id: 0,
      cola_Nombres: this.colaborador.cola_Nombres,
      cola_Apellidos: this.colaborador.cola_Apellidos,
      cola_Identidad: this.colaborador.cola_Identidad,
      cola_Direccion: this.colaborador.cola_Direccion,
      muni_Id: this.colaborador.muni_Id,
      cola_FechaNacimiento: this.colaborador.cola_FechaNacimiento,
      cola_Sexo: this.colaborador.cola_Sexo,
      cola_UsuaCreacion: this.colaborador.cola_UsuaCreacion,
      cola_FechaCreacion: "2023-11-14T02:05:10.933Z",
      cola_UsuaModificacion: 0,
      cola_FechaModificacion: "2023-11-14T02:05:10.933Z",
      muni_Codigo: "string",
      muni_Nombre: "string",
      sucursales: JSON.stringify(this.sucursalesForm.value),
      usuarioCreacion: "string",
      usuarioModificacion: "string"

    }

    this.http.post('/Colaboradores/Insertar', mockData)
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
          background: '#f6f6baf2'
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
