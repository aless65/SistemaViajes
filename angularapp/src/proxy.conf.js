const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/Login",
      "/Colaboradores/Listado",
      "/Colaboradores/Insertar",
      "/ColaboradoresXSucursales/Listado",
      "/Municipios/Listado",
      '/Sucursales/Listado',
      '/Transportistas/Listado',
      '/Viajes/Listado',
      '/Viajes/Insertar',
      '/Viajes/Find',
      '/Viajes/Reporte',
    ],
    target: "https://localhost:7292",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
