namespace webapi.Models.Gral
{
    public class SucursalesViewModel
    {
        public int sucu_Id { get; set; }

        public string sucu_Nombre { get; set; }

        public string sucu_Direccion { get; set; }

        public int muni_Id { get; set; }

        public bool? sucu_Estado { get; set; }

        public int sucu_UsuaCreacion { get; set; }

        public DateTime sucu_FechaCreacion { get; set; }

        public int? sucu_UsuaModificacion { get; set; }

        public DateTime? sucu_FechaModificacion { get; set; }
    }
}
