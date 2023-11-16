import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
providedIn: 'root'
})

export class Service {
    constructor(private http:HttpClient) { }

    getMunicipios(){
        // let municipios;
        // this.http.get('/Municipios/Listado').subscribe((result: any) => {
        //     municipios = result.data;
        // });
        
        // return municipios;
        return this.http.get('/Municipios/Listado');
    }
}