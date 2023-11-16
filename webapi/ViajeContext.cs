using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using webapi.Context;

namespace webapi
{
    public class ViajeContext : SistemaViajesContext
    {
        public static string ConnectionString { get; set; }

        public ViajeContext()
        {
            ChangeTracker.LazyLoadingEnabled = false;
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(ConnectionString);
            }

            base.OnConfiguring(optionsBuilder);
        }

        public static void BuildConnectionString(string connection)
        {
            var connectionStringBuilder = new SqlConnectionStringBuilder { ConnectionString = connection };
            ConnectionString = connectionStringBuilder.ConnectionString;
        }
    }
}
