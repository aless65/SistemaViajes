using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webapi.Entities;
using webapi.Models.Viaj;
using webapi.Repository.Viaj;

namespace webapi.Controllers.Viaj
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViajesController : Controller
    {
        private readonly ViajesRepository _viajesRepository;
        private readonly IMapper _mapper;

        public ViajesController(ViajesRepository viajesRepository, IMapper mapper)
        {
            _viajesRepository = viajesRepository;
            _mapper = mapper;
        }

        [HttpGet("/Viajes/Listado")]
        public IActionResult Index()
        {
            var resultado = _viajesRepository.List();
            if (resultado.Success)
                resultado.Data = _mapper.Map<IEnumerable<ViajesViewModel>>(resultado.Data);

            return Ok(resultado);
        }

        [HttpPost("/Viajes/Insertar")]
        public IActionResult Insert(ViajesViewModel item)
        {
            var viaje = _mapper.Map<tbViajes>(item);

            var resultado = _viajesRepository.Insert(viaje);

            return Ok(resultado);
        }

        [HttpGet("/Viajes/Find")]
        public IActionResult Find(int id)
        {
            var resultado = _viajesRepository.find(id);
            if (resultado.Success)
                resultado.Data = _mapper.Map<ViajesViewModel>(resultado.Data);

            return Ok(resultado);
        }

        [HttpGet("/Viajes/Reporte")]
        public IActionResult Reporte(int tran_Id, string fechaInicio, string fechaFin)
        {
            var resultado = _viajesRepository.Reporte(tran_Id, fechaInicio, fechaFin);
            if (resultado.Success)
                resultado.Data = _mapper.Map<IEnumerable<ViajesViewModel>>(resultado.Data);

            return Ok(resultado);
        }
    }
}
