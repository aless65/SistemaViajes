namespace webapi.Repository
{
    public class ScriptsDataBase
    {
        #region Colaboradores
        public static string UDP_ListarColaboradores = "viaj.UDP_tbColaboradores_Listar";
        public static string UDP_InsertarColaboradores = "viaj.UDP_tbColaboradores_Insertar";
        public static string UDP_ListarColaboradoresXSucursales = "viaj.UDP_tbColaboradoresXSucursales_Listar";
        #endregion

        #region Municipios
        public static string UDP_ListarMunicipios = "gral.UDP_tbMunicipios_Listar";
        #endregion

        #region Sucursales
        public static string UDP_ListarSucursales = "gral.UDP_tbSucursales_Listar";
        #endregion

        #region Transportistas
        public static string UDP_ListarTransportistas = "viaj.UDP_tbTransportistas_Listar";
        #endregion

        #region Usuarios
        public static string UDP_Login = "acce.UDP_Login";
        #endregion

        #region Viajes
        public static string UDP_ListarViajes = "viaj.UDP_tbViajes_Listar";
        public static string UDP_InsertarViajes = "viaj.UDP_tbViajes_Insertar";

        public static string UDP_FindViajes = "viaj.UDP_tbViajes_Find";
        public static string UDP_ReporteViajes = "viaj.UDP_ReporteViajes";
        #endregion
    }
}
