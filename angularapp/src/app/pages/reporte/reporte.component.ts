import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select2Data } from 'ng-select2-component';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as moment from 'moment';
import { Column } from 'pdfmake/interfaces';;
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})
export class ReporteComponent {
  pageTitle: BreadcrumbItem[] = [];
  validationGroup!: FormGroup;
  tran_Id: number = 0;
  fechaInicio = '';
  fechaFin = '';
  transportista: Select2Data = [];
  viaje: any;
  docDefinition!: any;
  detalles: any;
  totalPago: number = 0;
  totalDistancia: number = 0;

  constructor(
    private fb: FormBuilder,
    // private service: Service,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.validationGroup = this.fb.group({
      Transportista: ['', Validators.required],
      FechaInicio: ['', Validators.required],
      FechaFin: ['', [Validators.required]],
    });

    http.get('/Transportistas/Listado').subscribe(
      (response: any) => {
        let optionsTransportistas = response.data.map((item: any) => ({
          value: item.tran_Id,
          label: `${item.tran_Nombres} ${item.tran_Apellidos}`,
        }));

        this.transportista = [
          {
            label: 'Escoja un transportista',
            options: optionsTransportistas,
          },
        ];
      },
      (error) => console.log(error)
    );
  }

  get form() {
    return this.validationGroup.controls;
  }

  validarYGuardar() {
    if (this.validationGroup.valid) {
      this.http
        .get(
          `/Viajes/Reporte?tran_Id=${this.tran_Id}&fechaInicio=${this.fechaInicio}&fechaFin=${this.fechaFin}`
        )
        .subscribe((data: any) => {
          this.viaje = data.data;

          this.totalPago = this.viaje.reduce((sum: any, item: any) => sum + item.totalAPagar, 0);
          this.totalDistancia = this.viaje.reduce((sum: any, item: any) => sum + item.viaj_TotalKm, 0);
          

          this.generatePdf();
        });
    }
  }

   // Function to convert image file to data URL
   getDataUrl = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas to ensure transparency
            ctx?.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/png'); // Preserve transparency by using PNG format
            resolve(dataURL);
        };
        img.onerror = reject;
        img.src = url;
    });
};

  generatePdf = async () => {
    const imageDataUrl = await this.getDataUrl('https://cdn.pixabay.com/photo/2013/03/13/17/49/bus-93219_1280.png');
    const backgroundDataUrl = await this.getDataUrl('https://cdn.pixabay.com/photo/2013/03/13/17/49/bus-93219_1280.png');

    this.docDefinition = {
      background: {
        image: backgroundDataUrl,
        width: 595.28,
        height: 841.89,
        opacity: 0.3,
        fit: [800, 600],
        alignment: 'center',
        margin: [0, (841.89 - 600) / 2], // Adjust the top margin for vertical centering
      },
      content: [
        {
          columns: [
            {
              width: 100,
              height: 120,
              image: imageDataUrl,
              fit: [110, 120],
            },
            {
              width: 250,
              stack: [
                {
                  text: moment(this.fechaInicio).format('DD/MM/YYYY') + ' - ' + moment(this.fechaFin).format('DD/MM/YYYY'),
                  fontSize: 10,
                  // width: 75,
                  margin: [0, 0, 100, 0], // Add margin: [top, right, bottom, left]
                },
                {
                  margin: [0, 5, 0, 0],
                  text: (this.viaje?.[0]?.tran_NombreCompleto ?? ''),
                  style: 'subheader',
                },
                {
                  margin: [0, 7, 0, 0],
                  text: [
                    {
                      text: 'Tarifa por km:',
                      bold: true,
                      style: 'subheader2',
                    },
                    {
                      text: (this.viaje?.[0]?.tran_TarifaKm ?? ''),
                      style: 'subheader2',
                    },
                  ],
                },
                {
                  margin: [0, 7, 0, 0],
                  text: [
                    {
                      text: 'Distancia total (km): ',
                      bold: true,
                      style: 'subheader2',
                    },
                    {
                      text: this.totalDistancia,
                      style: 'subheader2',
                    },
                  ],
                },
                {
                  margin: [0, 7, 0, 0],
                  text: [
                    {
                      text: 'Total a pagar: ',
                      bold: true,
                      style: 'subheader2',
                    },
                    {
                      text: this.totalPago,
                      style: 'subheader2',
                    },
                  ],
                },
              ],
            },
          ] as Column[],
          columnGap: 20,
        },
        ...this.viaje.map((viaje: any, i: any) => [
          {
            columns: [
              {
                stack: [
                  {
                    margin: [0, 40, 0, 0],
                    text: [
                      {
                        text: 'Fecha y hora: ',
                        bold: true,
                        style: 'subheader2',
                      },
                      {
                        text: moment(viaje.viaj_FechaYHora).format('DD/MM/YYYY HH:MM:SS'),
                        style: 'subheader2',
                      },
                    ],
                  },
                  {
                    margin: [0, 7, 0, 0],
                    text: [
                      {
                        text: 'Sucursal: ',
                        bold: true,
                        style: 'subheader2',
                      },
                      {
                        text: this.viaje[i].sucu_Nombre,
                        style: 'subheader2',
                      },
                    ],
                  },
                ],
              },
              {
                stack: [
                  {
                    margin: [0, 40, 0, 0],
                    text: [
                      {
                        text: 'Distancia total (km): ',
                        bold: true,
                        style: 'subheader2',
                      },
                      {
                        text: this.viaje[i].viaj_TotalKm,
                        style: 'subheader2',
                      },
                    ],
                  },
                  {
                    margin: [0, 7, 0, 0],
                    text: [
                      {
                        text: 'Total a pagar viaje: ',
                        bold: true,
                        style: 'subheader2',
                      },
                      {
                        text: this.viaje[i].totalAPagar,
                        style: 'subheader2',
                      },
                    ],
                  },
                ],
              }
            ] as Column[],
            columnGap: 20,
            
          },
          {
            margin: [0, 7, 0, 20],
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 5,
                x2: 515,
                y2: 5,
                lineWidth: 1,
                lineColor: '#cccccc',
              },
            ],
          },
          {
            columns: [
              {
                width: '100%',
                stack: [
                  {
                    table: {
                      headerRows: 1,
                      widths: ['15%', '40%', '40%'],
                      body: [
                        [
                          {
                            text: '#',
                            bold: true,
                            fontSize: 10,
                            margin: [0, 5, 0, 5],
                          },
                          {
                            text: 'Colaborador',
                            bold: true,
                            fontSize: 10,
                            margin: [0, 5, 0, 5],
                          },
                          {
                            text: 'Distancia',
                            bold: true,
                            fontSize: 10,
                            margin: [0, 5, 0, 5],
                          },
                        ],
                        ...JSON.parse(this.viaje[i].detalles).map((detalle : any, index: any) => [
                          {
                            text: index + 1,
                            fillColor: undefined,
                            fontSize: 10,
                            margin: [0, 5, 0, 5],
                          },
                          {
                            text: detalle.cola_NombreCompleto,
                            fillColor: undefined,
                            fontSize: 10,
                            margin: [0, 5, 0, 5],
                          },
                          {
                            text: detalle.suco_DistanciaKm,
                            fillColor: undefined,
                            fontSize: 10,
                            margin: [0, 5, 0, 5],
                          }
                        ]),
                      ],
                      //   width: '100%', // Set the table width to 100%
                    },
                    layout: 'noBorders',
                  },
                ],
              },
            ],
          },
        ])
        
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
        },
        subheader: {
          fontSize: 13,
          bold: true,
        },
        quote: {
          italics: true,
        },
        small: {
          fontSize: 8,
        },
        subheader2: {
          fontSize: 10,
          italics: true,
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(this.docDefinition);
    pdfDocGenerator.getBlob(async (blob) => {
      const dataUrl = URL.createObjectURL(blob);

      const pdfContainer = document.getElementById('viajeContainer');

      // Remove existing PDF if any
      const existingIframe = pdfContainer?.querySelector('iframe');
      if (existingIframe) {
        pdfContainer?.removeChild(existingIframe);
      }

      // Create a new iframe for the updated PDF
      const iframe = document.createElement('iframe');
      iframe.src = dataUrl;
      iframe.style.width = '100%';
      iframe.style.height = '1250px';

      pdfContainer?.appendChild(iframe);

      // Trigger change detection to ensure the value is updated in the component
      this.changeDetectorRef.detectChanges();

    });
  };
}
