using Dapper;
using Microsoft.Data.SqlClient;
using webapi.Entities;

namespace webapi.Repository.Gral
{
    public class MunicipiosRepository : IRepository<tbMunicipios>
    {
        public ServiceResult Delete(tbMunicipios item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult find(int? id)
        {
            throw new NotImplementedException();
        }

        public ServiceResult Insert(tbMunicipios item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult List()
        {
            var resultado = new ServiceResult();

            try
            {
                using var db = new SqlConnection(ViajeContext.ConnectionString);
                var response = db.Query<tbMunicipios>(ScriptsDataBase.UDP_ListarMunicipios, null, commandType: System.Data.CommandType.StoredProcedure);

                return resultado.Ok(response);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex);
            }
        }

        public ServiceResult Update(tbMunicipios item)
        {
            throw new NotImplementedException();
        }
    }
}
