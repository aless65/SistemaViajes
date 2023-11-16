--******** ACCESO

--Usuarios
CREATE OR ALTER PROCEDURE acce.UDP_Login 
	@usua_Nombre		NVARCHAR(100)
	,@usua_Contrasena	NVARCHAR(MAX)
AS
BEGIN
	DECLARE @password NVARCHAR(MAX) = HASHBYTES('SHA2_512', @usua_Contrasena);

	SELECT	usua_Id
			,usua_Nombre
			,usua_Imagen
			,usua_EsAdmin
			,usua.role_Id
			,role_Nombre
			,CASE 
				WHEN usua.usua_EsAdmin = 0  THEN (SELECT * 
				  FROM acce.tbPantallas
				  WHERE pant_Id IN (SELECT pant_Id 
									FROM acce.tbRolesXPantallas
									WHERE role_Id = usua.role_Id) FOR JSON PATH) 
				ELSE (SELECT * FROM acce.tbPantallas FOR JSON PATH) END AS pantallas
		FROM acce.tbUsuarios usua LEFT JOIN acce.tbRoles [role]
	ON usua.role_Id = [role].role_Id
	WHERE usua_Nombre = @usua_Nombre
	AND usua_Contrasena = @password
END
GO
--******** GENERALES
CREATE OR ALTER PROCEDURE gral.UDP_tbMunicipios_Listar
AS
BEGIN
	SELECT muni_Id, 
		   muni_Codigo, 
		   muni_Nombre, 
		   muni.depa_Id,
		   depa.depa_Codigo,
		   depa.depa_Nombre
	FROM gral.tbMunicipios muni
	INNER JOIN gral.tbDepartamentos depa	ON muni.depa_Id = depa.depa_Id
	WHERE muni_Estado = 1
END
GO

CREATE OR ALTER PROCEDURE gral.UDP_tbSucursales_Listar
AS
BEGIN
	SELECT sucu_Id,  
		   sucu_Nombre
	FROM gral.tbSucursales 
	WHERE sucu_Estado = 1
END
GO
--******** VIAJES

--Colaboradores
CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradores_Listar
AS
BEGIN
	SELECT cola_Id, 
		   cola_Nombres, 
		   cola_Apellidos, 
		   cola_Identidad, 
		   cola_Direccion, 
		   cola.muni_Id, 
		   muni.muni_Codigo,
		   muni.muni_Nombre,
		   cola_FechaNacimiento, 
		   CASE WHEN cola_Sexo = 'F' THEN 'Femenino'
				ELSE 'Masculino' 
		   END AS cola_Sexo,
		   cola_UsuaCreacion, 
		   usuaCrea.usua_Nombre usuarioCreacion,
		   cola_FechaCreacion, 
		   cola_UsuaModificacion, 
		   usuaModifica.usua_Nombre usuarioModificacion,
		   cola_FechaModificacion,
		   (SELECT suco_Id,
				   suco.sucu_Id,
				   suco_DistanciaKm,
				   cola_Id,
				   sucu_Nombre
		   FROM [viaj].[tbSucursalesXColaboradores] suco
		   INNER JOIN gral.tbSucursales	sucu ON suco.sucu_Id = sucu.sucu_Id
		   WHERE suco.cola_Id = cola.cola_Id FOR JSON PATH) sucursales
	FROM [viaj].[tbColaboradores] cola				
	INNER JOIN gral.tbMunicipios muni			ON   cola.muni_Id = muni.muni_Id				
	INNER JOIN acce.tbUsuarios usuaCrea			ON	 cola.cola_UsuaCreacion = usuaCrea.usua_Id	
	LEFT JOIN  acce.tbUsuarios usuaModifica		ON	 cola.cola_UsuaModificacion = usuaModifica.usua_Id
	WHERE cola_Estado = 1
END
GO

CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradoresXSucursales_Listar 
	@sucu_Id INT
AS
BEGIN
	SELECT suco.cola_Id,
		   cola_Nombres,
		   cola_Apellidos,
		   suco_DistanciaKm
	FROM [viaj].[tbSucursalesXColaboradores] suco
	INNER JOIN viaj.tbColaboradores cola	ON suco.cola_Id = cola.cola_Id
	WHERE suco.sucu_Id = @sucu_Id
END
GO

CREATE OR ALTER PROCEDURE viaj.UDP_tbColaboradores_Insertar 
		@cola_Nombres			NVARCHAR(300), 
		@cola_Apellidos			NVARCHAR(300), 
		@cola_Identidad			VARCHAR(13), 
		@cola_Direccion			NVARCHAR(500), 
		@muni_Id				INT, 
		@cola_FechaNacimiento	DATE,
		@cola_Sexo				CHAR,
		@sucursales				NVARCHAR(MAX),
		@cola_UsuaCreacion		INT
AS
BEGIN
	BEGIN TRANSACTION 
	BEGIN TRY
		INSERT INTO viaj.tbColaboradores(cola_Nombres, 
										 cola_Apellidos, 
										 cola_Identidad, 
										 cola_Direccion, 
										 muni_Id, 
										 cola_FechaNacimiento, 
										 cola_Sexo,
										 cola_UsuaCreacion, 
										 cola_FechaCreacion)
		VALUES (@cola_Nombres, 
				@cola_Apellidos, 
				@cola_Identidad, 
				@cola_Direccion, 
				@muni_Id, 
				@cola_FechaNacimiento, 
				@cola_Sexo,
				@cola_UsuaCreacion, 
				GETDATE())

		DECLARE @cola_Id INT = SCOPE_IDENTITY()

		IF(@sucursales IS NOT NULL AND @sucursales != '')
			BEGIN

				INSERT INTO viaj.tbSucursalesXColaboradores(sucu_Id, 
															suco_DistanciaKm, 
															cola_Id, 
															suco_UsuaCreacion, 
															suco_FechaCreacion)

				SELECT *,
					   @cola_Id,
					   @cola_UsuaCreacion,
					   GETDATE()
				FROM OPENJSON(@sucursales, '$.tableRows')
				WITH (
					sucu_Id	INT,
					suco_DistanciaKm DECIMAL(18,2)
				)
			END

		SELECT 1

	COMMIT TRAN 
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
		SELECT ERROR_MESSAGE()
	END CATCH
END
GO

--Viajes
CREATE OR ALTER PROCEDURE viaj.UDP_tbViajes_Listar
AS
BEGIN
	SELECT viaj_Id,
		   viaj_FechaYHora,
		   viaj_TotalKm,
		   sucu.sucu_Id,
		   sucu_Nombre,
		   viaj.tran_Id,
		   viaj_UsuaCreacion,
		   usuCrea.usua_Nombre usuarioCreacion,
		   viaj_FechaCreacion,
		   usuModif.usua_Nombre usuarioModificacion,
		   viaj_FechaModificacion,
		   CONCAT(tras.tran_Nombres, ' ', tras.tran_Apellidos) AS tran_NombreCompleto,
		   (SELECT vide_Id,
				   vide.cola_Id,
				   CONCAT(cola.cola_Nombres, ' ', cola.cola_Apellidos) cola_NombreCompleto
			FROM [viaj].[tbViajesDetalles] vide
			INNER JOIN viaj.tbColaboradores cola		ON vide.cola_Id = cola.cola_Id
			WHERE vide.viaj_Id = viaj.viaj_Id FOR JSON PATH) detalles
	FROM [viaj].[tbViajes] viaj
	INNER JOIN gral.tbSucursales sucu		ON sucu.sucu_Id = viaj.sucu_Id
	INNER JOIN viaj.tbTransportistas tras	ON tras.tran_Id = viaj.tran_Id	
	INNER JOIN acce.tbUsuarios usuCrea		ON viaj.viaj_UsuaCreacion = usuCrea.usua_Id
	LEFT JOIN acce.tbUsuarios usuModif		ON viaj.viaj_UsuaModificacion = usuModif.usua_Id
END
GO

CREATE OR ALTER PROCEDURE viaj.UDP_tbViajes_Find 
	@viaj_Id	INT
AS
BEGIN
	SELECT viaj_Id,
		   viaj_FechaYHora,
		   viaj_TotalKm,
		   sucu.sucu_Id,
		   sucu_Nombre,
		   viaj.tran_Id,
		   viaj_UsuaCreacion,
		   usuCrea.usua_Nombre usuarioCreacion,
		   viaj_FechaCreacion,
		   usuModif.usua_Nombre usuarioModificacion,
		   viaj_FechaModificacion,
		   CONCAT(tras.tran_Nombres, ' ', tras.tran_Apellidos) AS tran_NombreCompleto,
		   (SELECT vide_Id,
				   vide.cola_Id,
				   CONCAT(cola.cola_Nombres, ' ', cola.cola_Apellidos) cola_NombreCompleto,
				   suco_DistanciaKm
			FROM [viaj].[tbViajesDetalles] vide
			INNER JOIN viaj.tbColaboradores cola			ON vide.cola_Id = cola.cola_Id
			INNER JOIN viaj.tbSucursalesXColaboradores suco ON suco.cola_Id = cola.cola_Id
			WHERE vide.viaj_Id = viaj.viaj_Id
			AND suco.sucu_Id = viaj.sucu_Id FOR JSON PATH) detalles
	FROM [viaj].[tbViajes] viaj
	INNER JOIN gral.tbSucursales sucu		ON sucu.sucu_Id = viaj.sucu_Id
	INNER JOIN viaj.tbTransportistas tras	ON tras.tran_Id = viaj.tran_Id	
	INNER JOIN acce.tbUsuarios usuCrea		ON viaj.viaj_UsuaCreacion = usuCrea.usua_Id
	LEFT JOIN acce.tbUsuarios usuModif		ON viaj.viaj_UsuaModificacion = usuModif.usua_Id
	WHERE viaj_Id = @viaj_Id
END
GO

--EXEC viaj.UDP_tb_Viajes_Insertar '2023-11-05 18:00:00', 35.0, 3, 2, '{"colaboradores": {"cola_Id": 4}, {"cola_Id": 35}}}', 1

CREATE OR ALTER PROCEDURE viaj.UDP_tbViajes_Insertar
	@viaj_FechaYHora		DATETIME, 
	@viaj_TotalKm			DECIMAL(18,2), 
	@sucu_Id				INT, 
	@tran_Id				INT,
	@detalles				NVARCHAR(MAX),
	@viaj_UsuaCreacion		INT
AS
BEGIN
	BEGIN TRANSACTION
	BEGIN TRY
		INSERT INTO [viaj].[tbViajes](viaj_FechaYHora, 
									  viaj_TotalKm, 
									  sucu_Id, 
									  tran_Id,
									  viaj_UsuaCreacion, 
									  viaj_FechaCreacion)
		VALUES (@viaj_FechaYHora, 
				@viaj_TotalKm, 
				@sucu_Id, 
				@tran_Id,
				@viaj_UsuaCreacion, 
				GETDATE())

		DECLARE @viaj_Id INT = SCOPE_IDENTITY()

		IF(@detalles IS NOT NULL AND @detalles != '')
			BEGIN
				INSERT INTO [viaj].[tbViajesDetalles](cola_Id,
													  viaj_Id,
													  vide_UsuaCreacion, 
													  vide_FechaCreacion)
				SELECT *,
					   @viaj_Id,
					   @viaj_UsuaCreacion,
					   GETDATE()
				FROM OPENJSON(@detalles, '$.colaboradores')
				WITH (
					cola_Id	INT
				)
			END

		SELECT 1
	COMMIT TRAN
	END TRY
	BEGIN CATCH
		ROLLBACK TRAN
		SELECT ERROR_MESSAGE()
	END CATCH
END
GO

--Transportistas
CREATE OR ALTER PROCEDURE viaj.UDP_tbTransportistas_Listar
AS
BEGIN
	SELECT tran_Id,
		   tran_Nombres,
		   tran_Apellidos
	FROM viaj.tbTransportistas
	WHERE tran_Estado = 1
END
GO

--Reporte
CREATE OR ALTER PROCEDURE viaj.UDP_ReporteViajes 
	@tran_Id		INT,
	@fechaInicio	DATETIME,
	@fechaFin		DATETIME
AS
BEGIN
	SELECT viaj_Id,
		   viaj_FechaYHora,
		   viaj_TotalKm,
		   sucu.sucu_Id,
		   sucu_Nombre,
		   viaj.tran_Id,
		   viaj_UsuaCreacion,
		   usuCrea.usua_Nombre usuarioCreacion,
		   viaj_FechaCreacion,
		   usuModif.usua_Nombre usuarioModificacion,
		   viaj_FechaModificacion,
		   CONCAT(tras.tran_Nombres, ' ', tras.tran_Apellidos) AS tran_NombreCompleto,
		   tran_TarifaKm,
		   (SELECT vide_Id,
				   vide.cola_Id,
				   CONCAT(cola.cola_Nombres, ' ', cola.cola_Apellidos) cola_NombreCompleto,
				   suco_DistanciaKm
			FROM [viaj].[tbViajesDetalles] vide
			INNER JOIN viaj.tbColaboradores cola			ON vide.cola_Id = cola.cola_Id
			INNER JOIN viaj.tbSucursalesXColaboradores suco ON suco.cola_Id = cola.cola_Id
			WHERE vide.viaj_Id = viaj.viaj_Id
			AND suco.sucu_Id = viaj.sucu_Id FOR JSON PATH) detalles,
			CAST(viaj_TotalKm*tran_TarifaKm AS DECIMAL(18,2)) totalAPagar
	FROM [viaj].[tbViajes] viaj
	INNER JOIN gral.tbSucursales sucu		ON sucu.sucu_Id = viaj.sucu_Id
	INNER JOIN viaj.tbTransportistas tras	ON tras.tran_Id = viaj.tran_Id	
	INNER JOIN acce.tbUsuarios usuCrea		ON viaj.viaj_UsuaCreacion = usuCrea.usua_Id
	LEFT JOIN acce.tbUsuarios usuModif		ON viaj.viaj_UsuaModificacion = usuModif.usua_Id
	WHERE viaj.tran_Id = @tran_Id
	AND viaj_FechaYHora BETWEEN @fechaInicio AND @fechaFin
	ORDER BY viaj_FechaYHora
END

SELECT * FROM viaj.tbTransportistas