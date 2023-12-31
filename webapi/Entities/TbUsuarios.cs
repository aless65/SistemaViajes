﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities;

public partial class tbUsuarios
{
    public int usua_Id { get; set; }

    public string usua_Nombre { get; set; }

    public string usua_Contrasena { get; set; }

    public string usua_Imagen { get; set; }

    public bool usua_EsAdmin { get; set; }

    public int? role_Id { get; set; }

    public bool? usua_Estado { get; set; }

    public int usua_UsuaCreacion { get; set; }

    public DateTime usua_FechaCreacion { get; set; }

    public int? usua_UsuaModificacion { get; set; }

    public DateTime? usua_FechaModificacion { get; set; }

    [NotMapped]
    public string? role_Nombre { get; set; }
    [NotMapped]
    public string? pantallas { get; set; }

    public virtual ICollection<tbUsuarios> Inverseusua_UsuaCreacionNavigation { get; set; } = new List<tbUsuarios>();

    public virtual ICollection<tbUsuarios> Inverseusua_UsuaModificacionNavigation { get; set; } = new List<tbUsuarios>();

    public virtual tbRoles role { get; set; }

    public virtual ICollection<tbColaboradores> tbColaboradorescola_UsuaCreacionNavigation { get; set; } = new List<tbColaboradores>();

    public virtual ICollection<tbColaboradores> tbColaboradorescola_UsuaModificacionNavigation { get; set; } = new List<tbColaboradores>();

    public virtual ICollection<tbDepartamentos> tbDepartamentosdepa_UsuaCreacionNavigation { get; set; } = new List<tbDepartamentos>();

    public virtual ICollection<tbDepartamentos> tbDepartamentosdepa_UsuaModificacionNavigation { get; set; } = new List<tbDepartamentos>();

    public virtual ICollection<tbMunicipios> tbMunicipiosmuni_UsuaCreacionNavigation { get; set; } = new List<tbMunicipios>();

    public virtual ICollection<tbMunicipios> tbMunicipiosmuni_UsuaModificacionNavigation { get; set; } = new List<tbMunicipios>();

    public virtual ICollection<tbRolesXPantallas> tbRolesXPantallas { get; set; } = new List<tbRolesXPantallas>();

    public virtual ICollection<tbRoles> tbRolesrole_UsuaCreacionNavigation { get; set; } = new List<tbRoles>();

    public virtual ICollection<tbRoles> tbRolesrole_UsuaModificacionNavigation { get; set; } = new List<tbRoles>();

    public virtual ICollection<tbSucursalesXColaboradores> tbSucursalesXColaboradores { get; set; } = new List<tbSucursalesXColaboradores>();

    public virtual ICollection<tbSucursales> tbSucursalessucu_UsuaCreacionNavigation { get; set; } = new List<tbSucursales>();

    public virtual ICollection<tbSucursales> tbSucursalessucu_UsuaModificacionNavigation { get; set; } = new List<tbSucursales>();

    public virtual ICollection<tbTransportistas> tbTransportistastran_UsuaCreacionNavigation { get; set; } = new List<tbTransportistas>();

    public virtual ICollection<tbTransportistas> tbTransportistastran_UsuaModificacionNavigation { get; set; } = new List<tbTransportistas>();

    public virtual ICollection<tbViajesDetalles> tbViajesDetallesvide_UsuaCreacionNavigation { get; set; } = new List<tbViajesDetalles>();

    public virtual ICollection<tbViajesDetalles> tbViajesDetallesvide_UsuaModificacionNavigation { get; set; } = new List<tbViajesDetalles>();

    public virtual ICollection<tbViajes> tbViajesviaj_UsuaCreacionNavigation { get; set; } = new List<tbViajes>();

    public virtual ICollection<tbViajes> tbViajesviaj_UsuaModificacionNavigation { get; set; } = new List<tbViajes>();

    public virtual tbUsuarios usua_UsuaCreacionNavigation { get; set; }

    public virtual tbUsuarios usua_UsuaModificacionNavigation { get; set; }
}