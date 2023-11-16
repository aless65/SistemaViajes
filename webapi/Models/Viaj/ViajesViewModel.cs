using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.Viaj
{
    public class ViajesViewModel
    {
        public int viaj_Id { get; set; }

        public DateTime viaj_FechaYHora { get; set; }

        public decimal viaj_TotalKm { get; set; }

        public int sucu_Id { get; set; }

        public int tran_Id { get; set; }

        public bool? viaj_Estado { get; set; }

        public int viaj_UsuaCreacion { get; set; }

        public DateTime viaj_FechaCreacion { get; set; }

        public int? viaj_UsuaModificacion { get; set; }

        public DateTime? viaj_FechaModificacion { get; set; }

        [NotMapped]
        public string tran_NombreCompleto { get; set; }

        [NotMapped]
        public decimal tran_TarifaKm { get; set; }

        [NotMapped]
        public decimal totalAPagar { get; set; }

        [NotMapped]
        public string sucu_Nombre { get; set; }

        [NotMapped]
        public string detalles { get; set; }

        [NotMapped]
        public string usuarioCreacion { get; set; }

        [NotMapped]
        public string usuarioModificacion { get; set; }
    }
}
