using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Viaj;
using webapi.Repository.Viaj;

namespace webapi.Controllers.Viaj
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportistasController : Controller
    {
        private readonly TransportistasRepository _transportistasRepository;
        private readonly IMapper _mapper;

        public TransportistasController(TransportistasRepository transportistasRepository, IMapper mapper)
        {
            _transportistasRepository = transportistasRepository;
            _mapper = mapper;
        }

        [HttpGet("/Transportistas/Listado")]
        public IActionResult Index()
        {
            var resultado = _transportistasRepository.List();
            if (resultado.Success)
                resultado.Data = _mapper.Map<IEnumerable<TransportistasViewModel>>(resultado.Data);

            return Ok(resultado);
        }
    }
}
