using Dapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Data.SqlClient;
using System.Collections.Generic;
using System.Data;
using webapi.Entities;

namespace webapi.Repository.Viaj
{
    public class ColaboradoresRepository : IRepository<tbColaboradores>
    {
        public ServiceResult Delete(tbColaboradores item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult find(int? id)
        {
            var resultado = new ServiceResult();

            try
            {
                using var db = new SqlConnection(ViajeContext.ConnectionString);
                var parametros = new DynamicParameters();

                parametros.Add("@sucu_Id", id, DbType.Int32, ParameterDirection.Input);
                var response = db.Query<tbColaboradores>(ScriptsDataBase.UDP_ListarColaboradoresXSucursales, parametros, commandType: System.Data.CommandType.StoredProcedure);

                return resultado.Ok(response);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex);
            }
        }

        public ServiceResult Insert(tbColaboradores item)
        {
            var resultado = new ServiceResult();

            try
            {
                using var db = new SqlConnection(ViajeContext.ConnectionString);
                var parametros = new DynamicParameters();

                parametros.Add("@cola_Nombres", item.cola_Nombres, DbType.String, ParameterDirection.Input);
                parametros.Add("@cola_Apellidos", item.cola_Apellidos, DbType.String, ParameterDirection.Input);
                parametros.Add("@cola_Identidad", item.cola_Identidad, DbType.String, ParameterDirection.Input);
                parametros.Add("@cola_Direccion", item.cola_Direccion, DbType.String, ParameterDirection.Input);
                parametros.Add("@muni_Id", item.muni_Id, DbType.Int32, ParameterDirection.Input);
                parametros.Add("@cola_FechaNacimiento", item.cola_FechaNacimiento, DbType.Date, ParameterDirection.Input);
                parametros.Add("@cola_Sexo", item.cola_Sexo, DbType.String, ParameterDirection.Input);
                parametros.Add("@sucursales", item.sucursales, DbType.String, ParameterDirection.Input);
                parametros.Add("@cola_UsuaCreacion", item.cola_UsuaCreacion, DbType.Int32, ParameterDirection.Input);

                var response = db.QueryFirst<string>(ScriptsDataBase.UDP_InsertarColaboradores, parametros, commandType: System.Data.CommandType.StoredProcedure);

                if(response == "1")
                    return resultado.Ok(response);
                else if(response.Contains("UNIQUE"))
                    return resultado.Conflict("Ya existe un colaborador con este número de identidad");
                else
                    return resultado.Error(response);

            }
            catch (Exception ex)
            {
                return resultado.Error(ex);
            }
        }

        public ServiceResult List()
        {
            var resultado = new ServiceResult();

            try
            {
                using var db = new SqlConnection(ViajeContext.ConnectionString);
                var response = db.Query<tbColaboradores>(ScriptsDataBase.UDP_ListarColaboradores, null, commandType: System.Data.CommandType.StoredProcedure);

                return resultado.Ok(response);
            } catch(Exception ex)
            {
                return resultado.Error(ex);
            }
        }

        public ServiceResult Update(tbColaboradores item)
        {
            throw new NotImplementedException();
        }
    }
}
