namespace webapi.Models.Viaj
{
    public class TransportistasViewModel
    {
        public int tran_Id { get; set; }

        public string tran_Nombres { get; set; }

        public string tran_Apellidos { get; set; }

        public string tran_Identidad { get; set; }

        public decimal tran_TarifaKm { get; set; }

        public DateTime tran_FechaNacimiento { get; set; }

        public string tran_Sexo { get; set; }

        public bool? tran_Estado { get; set; }

        public int tran_UsuaCreacion { get; set; }

        public DateTime tran_FechaCreacion { get; set; }

        public int? tran_UsuaModificacion { get; set; }

        public DateTime? tran_FechaModificacion { get; set; }
    }
}
