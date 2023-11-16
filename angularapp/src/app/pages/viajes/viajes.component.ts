import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Colaboradores, Viajes } from '../Models';

@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.component.html',
  styleUrls: ['./viajes.component.css']
})
export class ViajesComponent {
  pageTitle: BreadcrumbItem[] = [];
  viajes: Viajes[] = [];
  columns: Column[] = []; 
  newViaje!: FormGroup;
  returnUrl: string = '/';
  details: string = '/';
  pageSizeOptions: number[] = [5, 10, 25, 50];

  selectedViaje!: Viajes;
  
  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteViajeModal', { static: true }) deleteViajeModal: any;

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Viajes', path: '/', active: true }];
    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newViaje = this.fb.group({
      name: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/empleados/editar';
    this.details = this.route.snapshot.queryParams['returnUrl'] || '/apps/empleados/details';
  }

  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.viaje').forEach((e) => {
      e.addEventListener("click", () => {
        const viajeId = e.getAttribute('id');
        const viaje = this.viajes.find((via: Viajes) => via.viaj_Id === Number(viajeId));
        if (viaje) {
          this.Editar(viaje);
        }
      });
    });
    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedViaje = this.viajes.find(viaj => viaj.viaj_Id === selectedId) || this.selectedViaje;
        if (this.selectedViaje) {
          this.newViaje = this.fb.group({
            name: [this.selectedViaje.viaj_FechaYHora || '', Validators.required],
          });
          // this.openModalDelete();
        }
      });
    })

    document.querySelectorAll('.details').forEach((e) => {
      e.addEventListener("click", () => {
        const viajeId = e.getAttribute('id');
        this.Details(Number(viajeId));
      });
    });
  }

  _fetchData(): void {
    this.http.get('/Viajes/Listado').subscribe((result: any) => {
      this.viajes = result.data;
      console.log(result);
    },
    (error: any) => {
          console.log(error);
          // Handle post request error
        }
    );
  }

  // action de los botones iconos
  viajeActionFormatter(viaje: Viajes): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a class="edit action-icon empleado" style="color: #6658dd;" id="${viaje.viaj_Id}" role="button">
        <i class="mdi mdi-square-edit-outline"></i>
      </a>
      <a href="javascript:void(0);" class="delete action-icon" style="color: #9f100e;" id="${viaje.viaj_Id}"> <i class="mdi mdi-delete"></i></a>

      <a class="details action-icon details" id="${viaje.viaj_Id}"> <i class="bi bi-list-task" style="color: #0e9d9f;"></i> </a>
      `
    );
  }

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    this.columns = [

      {
        name: 'viaj_Id',
        label: 'ID',
        formatter: (viaje: Viajes) => viaje.viaj_Id
      },
      {
        name: 'viaj_FechaYHora',
        label: 'Fecha y hora',
        formatter: (viaje: Viajes) => {
          if (!viaje.viaj_FechaYHora) {
              return 'Invalid Date';
          }
  
          const date = new Date(viaje.viaj_FechaYHora);
  
          if (isNaN(date.getTime())) {
              // Handle invalid date string
              return 'Invalid Date';
          }
  
          const formattedDate = new Intl.DateTimeFormat('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric'
          }).format(date);
  
          return formattedDate;
        }
      },
      {
        name: 'tran_NombreCompleto',
        label: 'Transportista',
        formatter: (viaje: Viajes) => viaje.tran_NombreCompleto
      },
      {
        name: 'sucu_Nombre',
        label: 'Sucursal',
        formatter: (viaje: Viajes) => viaje.sucu_Nombre
      },
      {
        name: 'viaj_TotalKm',
        label: 'Total Km',
        formatter: (viaje: Viajes) => viaje.viaj_TotalKm
      },
      {
        name: 'Action',
        label: 'Acción',
        width: 82,
        formatter: this.viajeActionFormatter.bind(this),
        sort: false
      }]
  }

  //funcion para ir a la pagina editar y mandar el parametro o algo asi
  Details(viajeId: number): void {
    this.router.navigate(['/Viajes/Detalles'], { queryParams: { id: viajeId } });
  }

  Editar(viaje: Viajes) {
    console.log("si llegaaa");
       localStorage.setItem("id", viaje.viaj_Id!.toString());
       this.router.navigate([this.returnUrl]); 
   }

  //  openModalDelete(): void {
  //    this.activeModal.open(this.deleteColaboradorModal, { centered: true, windowClass: 'delete-modal' });
  //  }  

  /**
* Match table data with search input
* @param row Table row
* @param term Search the value
*/
  matches(row: Colaboradores, term: string) {
    return (row.cola_Id?.toString().includes(term) ||
            row.cola_Nombres?.toLowerCase().includes(term));
  }

  /**
   * Search Method
  */
  searchData(searchTerm: string): void {
    if (searchTerm === '') {
      this._fetchData();
    }
    else {
      let updatedData = this.viajes;
      //  filter
      updatedData = updatedData.filter(viaje => this.matches(viaje, searchTerm));
      this.viajes = updatedData;
    }

  }
}
