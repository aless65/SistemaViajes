using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webapi.Entities;
using webapi.Models.Gral;
using webapi.Models.Viaj;
using webapi.Repository.Gral;
using webapi.Repository.Viaj;

namespace webapi.Controllers.Gral
{
    [Route("api/[controller]")]
    [ApiController]
    public class MunicipiosController : Controller
    {
        private readonly MunicipiosRepository _municipiosRepository;
        private readonly IMapper _mapper;

        public MunicipiosController(MunicipiosRepository municipiosRepository, IMapper mapper)
        {
            _municipiosRepository = municipiosRepository;
            _mapper = mapper;
        }

        [HttpGet("/Municipios/Listado")]
        public IActionResult Index()
        {
            var resultado = _municipiosRepository.List();
            if (resultado.Success)
                resultado.Data = _mapper.Map<IEnumerable<MunicipiosViewModel>>(resultado.Data);

            return Ok(resultado);
        }
    }
}
