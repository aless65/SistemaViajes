export class Colaboradores {
    cola_Id?: number;
    cola_Nombres?: string;
    cola_Apellidos?: string;
    cola_Identidad?: string;
    cola_Direccion?: string;
    muni_Id?: number;
    muni_Codigo?: string;
    muni_Nombre?: string;
    cola_FechaNacimiento?: Date;   
    cola_Sexo?: string; 
    sucursales?: string;
    cola_UsuaCreacion?: number;
    usuarioCreacion?: string;
    cola_FechaCreacion?: string;
    cola_UsuaModificacion?: number;
    usuarioModificacion?: string;
    cola_FechaModificacion?: Date;
}

export class Viajes {
    viaj_Id?: number;
    viaj_FechaYHora?: string;
    viaj_TotalKm?: number;
    sucu_Id?: number;
    sucu_Nombre?: string;
    tran_Id?: number;
    tran_NombreCompleto?: string;
    detalles?: any;
    viaj_UsuaCreacion?: number;
    usuarioCreacion?: string;
    viaj_FechaCreacion?: string;
    viaj_UsuaModificacion?: number;
    usuarioModificacion?: string;
    viaj_FechaModificacion?: string;
}