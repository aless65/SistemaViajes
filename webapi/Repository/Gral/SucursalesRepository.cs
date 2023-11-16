using Dapper;
using Microsoft.Data.SqlClient;
using webapi.Entities;

namespace webapi.Repository.Gral
{
    public class SucursalesRepository : IRepository<tbSucursales>
    {
        public ServiceResult Delete(tbSucursales item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult find(int? id)
        {
            throw new NotImplementedException();
        }

        public ServiceResult Insert(tbSucursales item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult List()
        {
            var resultado = new ServiceResult();

            try
            {
                using var db = new SqlConnection(ViajeContext.ConnectionString);
                var response = db.Query<tbSucursales>(ScriptsDataBase.UDP_ListarSucursales, null, commandType: System.Data.CommandType.StoredProcedure);

                return resultado.Ok(response);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex);
            }
        }

        public ServiceResult Update(tbSucursales item)
        {
            throw new NotImplementedException();
        }
    }
}
