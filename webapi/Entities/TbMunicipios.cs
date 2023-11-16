﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Entities;

public partial class tbMunicipios
{
    public int muni_Id { get; set; }

    public string muni_Codigo { get; set; }

    public string muni_Nombre { get; set; }

    public int depa_Id { get; set; }

    public int muni_UsuaCreacion { get; set; }

    public DateTime muni_FechaCreacion { get; set; }

    public int? muni_UsuaModificacion { get; set; }

    public DateTime? muni_FechaModificacion { get; set; }

    public bool? muni_Estado { get; set; }

    [NotMapped]
    public string depa_Codigo { get; set; }

    [NotMapped]
    public string depa_Nombre { get; set; }

    public virtual tbDepartamentos depa { get; set; }

    public virtual tbUsuarios muni_UsuaCreacionNavigation { get; set; }

    public virtual tbUsuarios muni_UsuaModificacionNavigation { get; set; }

    public virtual ICollection<tbColaboradores> tbColaboradores { get; set; } = new List<tbColaboradores>();

    public virtual ICollection<tbSucursales> tbSucursales { get; set; } = new List<tbSucursales>();
}