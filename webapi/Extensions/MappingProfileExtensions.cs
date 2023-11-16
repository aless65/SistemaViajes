using AutoMapper;
using webapi.Entities;
using webapi.Models;
using webapi.Models.Acce;
using webapi.Models.Gral;
using webapi.Models.Viaj;

namespace webapi.Extensions
{
    public class MappingProfileExtensions: Profile
    {
       public MappingProfileExtensions()
        {
            #region acce
            CreateMap<UsuariosViewModel, tbUsuarios>().ReverseMap();
            #endregion

            #region gral
            CreateMap<MunicipiosViewModel, tbMunicipios>().ReverseMap();
            CreateMap<SucursalesViewModel, tbSucursales>().ReverseMap();
            #endregion

            #region viaj
            CreateMap<ColaboradoresViewModel, tbColaboradores>().ReverseMap();
            CreateMap<TransportistasViewModel, tbTransportistas>().ReverseMap();
            CreateMap<ViajesViewModel, tbViajes>().ReverseMap();
            #endregion
        }
    }
}
