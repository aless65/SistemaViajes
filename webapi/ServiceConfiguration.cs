using System.Runtime.CompilerServices;
using webapi.Repository.Acce;
using webapi.Repository.Gral;
using webapi.Repository.Viaj;

namespace webapi
{
    public static class ServiceConfiguration
    {
        public static void DataAccess(this IServiceCollection service, string connectionString)
        {
            service.AddScoped<ColaboradoresRepository>();
            service.AddScoped<MunicipiosRepository>();
            service.AddScoped<SucursalesRepository>();
            service.AddScoped<TransportistasRepository>();
            service.AddScoped<UsuariosRepository>();
            service.AddScoped<ViajesRepository>();
            ViajeContext.BuildConnectionString(connectionString);
        }
    }
}
