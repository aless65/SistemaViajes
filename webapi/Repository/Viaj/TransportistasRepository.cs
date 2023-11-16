using Dapper;
using Microsoft.Data.SqlClient;
using webapi.Entities;

namespace webapi.Repository.Viaj
{
    public class TransportistasRepository : IRepository<tbTransportistas>
    {
        public ServiceResult Delete(tbTransportistas item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult find(int? id)
        {
            throw new NotImplementedException();
        }

        public ServiceResult Insert(tbTransportistas item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult List()
        {
            var resultado = new ServiceResult();

            try
            {
                using var db = new SqlConnection(ViajeContext.ConnectionString);
                var response = db.Query<tbTransportistas>(ScriptsDataBase.UDP_ListarTransportistas, null, commandType: System.Data.CommandType.StoredProcedure);

                return resultado.Ok(response);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex);
            }
        }

        public ServiceResult Update(tbTransportistas item)
        {
            throw new NotImplementedException();
        }
    }
}
