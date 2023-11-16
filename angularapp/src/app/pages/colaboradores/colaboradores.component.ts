import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Colaboradores } from '../Models';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent {
  pageTitle: BreadcrumbItem[] = [];
  colaboradores: Colaboradores[] = [];
  columns: Column[] = []; 
  newColaborador!: FormGroup;
  returnUrl: string = '/';
  details: string = '/';
  pageSizeOptions: number[] = [5, 10, 25, 50];

  selectedColaborador!: Colaboradores;
  
  @ViewChild('advancedTable') advancedTable: any;
  @ViewChild('content', { static: true }) content: any;
  @ViewChild('deleteColaboradorModal', { static: true }) deleteColaboradorModal: any;
  // sanitizer: any;
  // service: any;

  /**
   *
   */
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private fb: FormBuilder,
    public activeModal: NgbModal,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Inicio', path: '/' }, { label: 'Colaboradores', path: '/', active: true }];
    this._fetchData();
    // initialize advance table 
    this.initAdvancedTableData();

    this.newColaborador = this.fb.group({
      name: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/apps/empleados/editar';
    this.details = this.route.snapshot.queryParams['returnUrl'] || '/apps/empleados/details';

  }

  handleTableLoad(event: any): void {
    // product cell
    document.querySelectorAll('.colaborador').forEach((e) => {
      e.addEventListener("click", () => {
        const colaboradorId = e.getAttribute('id');
        const colaborador = this.colaboradores.find((col: Colaboradores) => col.cola_Id === Number(colaboradorId));
        if (colaborador) {
          this.Editar(colaborador);
        }
      });
    });
    document.querySelectorAll('.delete').forEach((e) => {
      e.addEventListener("click", () => {  
        const selectedId = Number(e.id);
        this.selectedColaborador = this.colaboradores.find(cola => cola.cola_Id === selectedId) || this.selectedColaborador;
        if (this.selectedColaborador) {
          this.newColaborador = this.fb.group({
            name: [this.selectedColaborador.cola_Nombres || '', Validators.required],
          });
          this.openModalDelete();
        }
      });
    })

    document.querySelectorAll('.details').forEach((e) => {
      e.addEventListener("click", () => {
        const colaboradorId = e.getAttribute('id');
        this.Details(Number(colaboradorId));
      });
    });
  }

  _fetchData(): void {
    this.http.get('/Colaboradores/Listado').subscribe((result: any) => {
      this.colaboradores = result.data;
    },
    (error: any) => {
          console.log(error);
          // Handle post request error
        }
    );
  }

  // action de los botones iconos
  colaboradorActionFormatter(colaborador: Colaboradores): any {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<a class="edit action-icon empleado" style="color: #6658dd;" id="${colaborador.cola_Id}" role="button">
        <i class="mdi mdi-square-edit-outline"></i>
      </a>
      <a href="javascript:void(0);" class="delete action-icon" style="color: #9f100e;" id="${colaborador.cola_Id}"> <i class="mdi mdi-delete"></i></a>

      <a class="details action-icon details" id="${colaborador.cola_Id}"> <i class="bi bi-list-task" style="color: #0e9d9f;"></i> </a>
      `
    );
  }

  /**
   * initialize advance table columns
   */
  initAdvancedTableData(): void {
    this.columns = [

      {
        name: 'cola_Id',
        label: 'ID',
        formatter: (colaborador: Colaboradores) => colaborador.cola_Id
      },
      {
        name: 'cola_Nombres',
        label: 'Nombres',
        formatter: (colaborador: Colaboradores) => colaborador.cola_Nombres
      },
      {
        name: 'cola_Apellidos',
        label: 'Apellidos',
        formatter: (colaborador: Colaboradores) => colaborador.cola_Apellidos
      },
      {
        name: 'cola_Identidad',
        label: 'Identidad',
        formatter: (colaborador: Colaboradores) => colaborador.cola_Identidad
      },
      {
        name: 'cola_Sexo',
        label: 'Sexo',
        formatter: (colaborador: Colaboradores) => colaborador.cola_Sexo
      },
      {
        name: 'Action',
        label: 'Acción',
        width: 82,
        formatter: this.colaboradorActionFormatter.bind(this),
        sort: false
      }]
  }

  //funcion para ir a la pagina editar y mandar el parametro o algo asi
  Details(colaboradorId: number): void {
    this.router.navigate([this.details], { queryParams: { id: colaboradorId } });
  }

  Editar(colaborador: Colaboradores) {
       this.router.navigate([this.returnUrl]); 
   }

   openModalDelete(): void {
     this.activeModal.open(this.deleteColaboradorModal, { centered: true, windowClass: 'delete-modal' });
   }  

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
      let updatedData = this.colaboradores;
      //  filter
      updatedData = updatedData.filter(colaborador => this.matches(colaborador, searchTerm));
      this.colaboradores = updatedData;
    }

  }
}
