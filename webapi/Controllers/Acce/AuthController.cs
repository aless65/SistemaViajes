using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using webapi.Context;
using webapi.Models.Acce;
using webapi.Repository.Acce;

namespace webapi.Controllers.Acce
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly UsuariosRepository _usuariosRepository;
        private readonly IMapper _mapper;
        public AuthController(UsuariosRepository usuariosRepository, IMapper mapper)
        {
            _usuariosRepository = usuariosRepository;
            _mapper = mapper;
        }

        [HttpPost("/Login")]
        public IActionResult Login(UsuariosViewModel usuario)
        {
            var resultado = _usuariosRepository.Login(usuario.usua_Nombre, usuario.usua_Contrasena);
            //var resultado = _mapper.Map<UsuariosViewModel>(login);
            if(resultado.Success)
                resultado.Data = _mapper.Map<UsuariosViewModel>(resultado.Data);

            return Ok(resultado);
        }
    }
}
