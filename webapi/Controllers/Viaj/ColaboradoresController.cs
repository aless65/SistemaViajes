using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using webapi.Entities;
using webapi.Models.Viaj;
using webapi.Repository.Viaj;

namespace webapi.Controllers.Viaj
{
    [Route("api/[controller]")]
    [ApiController]
    public class ColaboradoresController : Controller
    {
        private readonly ColaboradoresRepository _colaboradoresRepository;
        private readonly IMapper _mapper;

        public ColaboradoresController(ColaboradoresRepository colaboradoresRepository, IMapper mapper)
        {
            _colaboradoresRepository = colaboradoresRepository;
            _mapper = mapper;
        }

        [HttpGet("/Colaboradores/Listado")]
        public IActionResult Index()
        {
            var resultado = _colaboradoresRepository.List();
            if (resultado.Success)
                resultado.Data = _mapper.Map<IEnumerable<ColaboradoresViewModel>>(resultado.Data);

            return Ok(resultado);
        }

        [HttpGet("/ColaboradoresXSucursales/Listado")]
        public IActionResult Find(int id)
        {
            var resultado = _colaboradoresRepository.find(id);
            if (resultado.Success)
                resultado.Data = _mapper.Map<IEnumerable<ColaboradoresViewModel>>(resultado.Data);

            return Ok(resultado);
        }

        [HttpPost("/Colaboradores/Insertar")]
        public IActionResult Insert(ColaboradoresViewModel item)
        {
            var colaborador = _mapper.Map<tbColaboradores>(item);

            var resultado = _colaboradoresRepository.Insert(colaborador);

            return Ok(resultado);
        }
    }
}
