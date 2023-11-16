using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.Acce
{
    public class UsuariosViewModel
    {
        public int usua_Id { get; set; }

        public string usua_Nombre { get; set; }

        public string usua_Contrasena { get; set; }

        public string usua_Imagen { get; set; }

        public bool usua_EsAdmin { get; set; }

        public int? role_Id { get; set; }

        public int usua_UsuaCreacion { get; set; }

        public DateTime usua_FechaCreacion { get; set; }

        public int? usua_UsuaModificacion { get; set; }

        public DateTime? usua_FechaModificacion { get; set; }

        [NotMapped]
        public string? role_Nombre { get; set; }
        [NotMapped]
        public string? pantallas { get; set; }
    }
}
