using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.Gral
{
    public class MunicipiosViewModel
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
    }
}
