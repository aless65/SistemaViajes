﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace webapi.Entities;

public partial class tbRolesXPantallas
{
    public int ropa_Id { get; set; }

    public int? role_Id { get; set; }

    public int? pant_Id { get; set; }

    public int ropa_UsuaCreacion { get; set; }

    public DateTime ropa_FechaCreacion { get; set; }

    public virtual tbPantallas pant { get; set; }

    public virtual tbRoles role { get; set; }

    public virtual tbUsuarios ropa_UsuaCreacionNavigation { get; set; }
}