using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models.Viaj
{
    public class ColaboradoresViewModel
    {

        public int cola_Id { get; set; }

        public string cola_Nombres { get; set; }

        public string cola_Apellidos { get; set; }

        public string cola_Identidad { get; set; }

        public string cola_Direccion { get; set; }

        public int muni_Id { get; set; }

        public DateTime cola_FechaNacimiento { get; set; }

        public string cola_Sexo { get; set; }

        public bool? cola_Estado { get; set; }

        public int cola_UsuaCreacion { get; set; }

        public DateTime cola_FechaCreacion { get; set; }

        public int? cola_UsuaModificacion { get; set; }

        public DateTime? cola_FechaModificacion { get; set; }

        [NotMapped]
        public string muni_Codigo { get; set; }

        [NotMapped]
        public string muni_Nombre { get; set; }

        [NotMapped]
        public string sucursales { get; set; }

        [NotMapped]
        public decimal suco_DistanciaKm { get; set; }

        [NotMapped]
        public string usuarioCreacion { get; set; }

        [NotMapped]
        public string usuarioModificacion { get; set; }

    }
}
