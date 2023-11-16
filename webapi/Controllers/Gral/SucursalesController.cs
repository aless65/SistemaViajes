using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webapi.Models.Gral;
using webapi.Repository.Gral;

namespace webapi.Controllers.Gral
{
    [Route("api/[controller]")]
    [ApiController]
    public class SucursalesController : Controller
    {
        private readonly SucursalesRepository _sucursalesRepository;
        private readonly IMapper _mapper;

        public SucursalesController(SucursalesRepository sucursalesRepository, IMapper mapper)
        {
            _sucursalesRepository = sucursalesRepository;
            _mapper = mapper;
        }

        [HttpGet("/Sucursales/Listado")]
        public IActionResult Index()
        {
            var resultado = _sucursalesRepository.List();
            if (resultado.Success)
                resultado.Data = _mapper.Map<IEnumerable<SucursalesViewModel>>(resultado.Data);

            return Ok(resultado);
        }
    }
}
