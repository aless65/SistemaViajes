using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using webapi.Entities;
using webapi.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace webapi.Repository.Acce
{
    public class UsuariosRepository : IRepository<tbUsuarios>
    {
        public ServiceResult Delete(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult find(int? id)
        {
            throw new NotImplementedException();
        }

        public ServiceResult Insert(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult List()
        {
            throw new NotImplementedException();
        }

        public ServiceResult Update(tbUsuarios item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult Login(string nombre, string contrasena)
        {
            var resultado = new ServiceResult();
            try
            {
                using var db = new SqlConnection(ViajeContext.ConnectionString);
                var parametros = new DynamicParameters();

                parametros.Add("@usua_Nombre", nombre, DbType.String, ParameterDirection.Input);
                parametros.Add("@usua_Contrasena", contrasena, DbType.String, ParameterDirection.Input);

                var response = db.QueryFirstOrDefault<tbUsuarios>(ScriptsDataBase.UDP_Login, parametros, commandType: CommandType.StoredProcedure);

                if (response != null)
                {
                    resultado.Ok(response);
                }
                else
                {
                    resultado.NotFound();
                }

                return resultado;
            }
            catch (Exception ex)
            {
                return resultado.Error(ex);
            }
        }
    }
}
