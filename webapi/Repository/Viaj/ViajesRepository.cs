using Dapper;
using Microsoft.Data.SqlClient;
using System.Data;
using webapi.Entities;

namespace webapi.Repository.Viaj
{
    public class ViajesRepository : IRepository<tbViajes>
    {
        public ServiceResult Delete(tbViajes item)
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

                parametros.Add("@viaj_Id", id, DbType.Int32, ParameterDirection.Input);
                var response = db.QueryFirst<tbViajes>(ScriptsDataBase.UDP_FindViajes, parametros, commandType: System.Data.CommandType.StoredProcedure);

                return resultado.Ok(response);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex);
            }
        }

        public ServiceResult Insert(tbViajes item)
        {
            var resultado = new ServiceResult();

            try
            {
                using var db = new SqlConnection(ViajeContext.ConnectionString);
                var parametros = new DynamicParameters();

                parametros.Add("@viaj_FechaYHora", item.viaj_FechaYHora, DbType.DateTime, ParameterDirection.Input);
                parametros.Add("@viaj_TotalKm", item.viaj_TotalKm, DbType.Decimal, ParameterDirection.Input);
                parametros.Add("@sucu_Id", item.sucu_Id, DbType.Int32, ParameterDirection.Input);
                parametros.Add("@tran_Id", item.tran_Id, DbType.Int32, ParameterDirection.Input);
                parametros.Add("@detalles", item.detalles, DbType.String, ParameterDirection.Input);
                parametros.Add("@viaj_UsuaCreacion", item.viaj_UsuaCreacion, DbType.Int32, ParameterDirection.Input);

                var response = db.QueryFirst<string>(ScriptsDataBase.UDP_InsertarViajes, parametros, commandType: System.Data.CommandType.StoredProcedure);

                if (response == "1")
                    return resultado.Ok(response);
                else if (response.Contains("UNIQUE"))
                    return resultado.Conflict("Ya existe un viaje con este transportista y esta hora");
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
                var response = db.Query<tbViajes>(ScriptsDataBase.UDP_ListarViajes, null, commandType: System.Data.CommandType.StoredProcedure);

                return resultado.Ok(response);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex);
            }
        }

        public ServiceResult Update(tbViajes item)
        {
            throw new NotImplementedException();
        }

        public ServiceResult Reporte(int tran_Id, string fechaInicio, string fechaFin)
        {
            var resultado = new ServiceResult();

            try
            {
                using var db = new SqlConnection(ViajeContext.ConnectionString);
                var parametros = new DynamicParameters();

                parametros.Add("@tran_Id", tran_Id, DbType.Int32, ParameterDirection.Input);
                parametros.Add("@fechaInicio", fechaInicio, DbType.DateTime, ParameterDirection.Input);
                parametros.Add("@fechaFin", fechaFin, DbType.DateTime, ParameterDirection.Input);

                var response = db.Query<tbViajes>(ScriptsDataBase.UDP_ReporteViajes, parametros, commandType: System.Data.CommandType.StoredProcedure);

                return resultado.Ok(response);
            }
            catch (Exception ex)
            {
                return resultado.Error(ex);
            }
        }
    }
}
