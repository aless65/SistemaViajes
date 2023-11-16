--GO
--USE master
--GO
--DROP DATABASE SistemaViajes
GO
CREATE DATABASE SistemaViajes
GO
USE SistemaViajes
GO
CREATE SCHEMA acce
GO
CREATE SCHEMA gral
GO
CREATE SCHEMA viaj
GO


--ESQUEMA ACCESO
CREATE TABLE acce.tbUsuarios(
	usua_Id					INT IDENTITY(1,1),
	usua_Nombre				NVARCHAR(100)	NOT NULL,
	usua_Contrasena			NVARCHAR(MAX)	NOT NULL,
	usua_Imagen				NVARCHAR(MAX)	NOT NULL,
	usua_EsAdmin			BIT				NOT NULL,
	role_Id					INT,

	usua_Estado				BIT NOT NULL CONSTRAINT DF_tbUsuarios_Estado DEFAULT 1,
	usua_UsuaCreacion		INT				NOT NULL,
	usua_FechaCreacion		DATETIME		NOT NULL,
	usua_UsuaModificacion	INT,
	usua_FechaModificacion	DATETIME

	CONSTRAINT PK_acce_tbUsuarios_usua_Id		PRIMARY KEY(usua_Id),
	CONSTRAINT UC_acce_tbUsuarios_usua_Nombre	UNIQUE(usua_Nombre)
);
GO

--******************************
--UDP PROVISIONAL DE USUARIOS
GO
CREATE OR ALTER PROCEDURE acce.UDP_tbUsuarios_Insertar
	@usua_Nombre			NVARCHAR(100)
	,@usua_Contrasena		NVARCHAR(MAX)
	,@usua_Imagen			NVARCHAR(MAX)
	,@usua_EsAdmin			BIT
	,@role_Id				INT
	,@usua_UsuaCreacion		INT			
	,@usua_FechaCreacion	DATETIME
AS
BEGIN
	BEGIN TRY
		DECLARE @password NVARCHAR(MAX) = HASHBYTES('SHA2_512', @usua_Contrasena);

		INSERT INTO acce.tbUsuarios(usua_Nombre
								,usua_Contrasena
								,usua_Imagen
								,usua_EsAdmin
								,role_Id
								,usua_UsuaCreacion
								,usua_FechaCreacion)
		VALUES (@usua_Nombre 
				,@password
				,@usua_Imagen
				,@usua_EsAdmin
				,@role_Id
				,@usua_UsuaCreacion
				,@usua_FechaCreacion)

		SELECT 1
	END TRY
	BEGIN CATCH
		SELECT 'Error Message: ' + ERROR_MESSAGE()
	END CATCH
END

GO
EXEC acce.UDP_tbUsuarios_Insertar 'admin', '123', 'https://static.wikia.nocookie.net/ba0628fe-3bc1-42c3-9c0c-aa91ba24f03c/scale-to-width/370', 1, NULL, 1, '2023-11-08'
GO
--******************************

--******************************
--CONSTRAINTS DE AUDITORÍA DE USUARIOS
ALTER TABLE acce.tbUsuarios
ADD CONSTRAINT FK_acce_tbUsuarios_tbUsuarios_usua_Id_usua_UsuaCreacion		FOREIGN KEY(usua_UsuaCreacion)		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_acce_tbUsuarios_tbUsuarios_usua_Id_usua_Modificacion		FOREIGN KEY(usua_UsuaModificacion)	REFERENCES acce.tbUsuarios(usua_Id)
GO
--******************************

CREATE TABLE acce.tbRoles(
	role_Id					INT IDENTITY(1,1),
	role_Nombre				NVARCHAR(100)	NOT NULL,

	role_Estado				BIT				DEFAULT 1,
	role_UsuaCreacion		INT				NOT NULL,
	role_FechaCreacion		DATETIME		NOT NULL,
	role_UsuaModificacion	INT,
	role_FechaModificacion	DATETIME

	CONSTRAINT PK_acce_tbRoles_role_Id									PRIMARY KEY(role_Id),
	CONSTRAINT UC_acce_tbRoles_role_Nombre								UNIQUE(role_Nombre),
	CONSTRAINT FK_acce_tbRoles_tbUsuarios_role_UsuaCreacion_usua_Id		FOREIGN KEY(role_UsuaCreacion)		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_acce_tbRoles_tbUsuarios_role_Modificacion_usua_Id		FOREIGN KEY(role_UsuaModificacion)	REFERENCES acce.tbUsuarios(usua_Id),
);
GO

CREATE TABLE acce.tbPantallas(
	pant_Id					INT IDENTITY(1,1),
	pant_Nombre				NVARCHAR(100)	NOT NULL,
	pant_URL				NVARCHAR(MAX)	NOT NULL,
	pant_Icon				NVARCHAR(250)	NOT NULL

	CONSTRAINT PK_acce_tbPantallas_pant_Id		PRIMARY KEY(pant_Id),
	CONSTRAINT UC_acce_tbPantallas_pant_Nombre  UNIQUE(pant_Nombre),
	--CONSTRAINT UC_acce_tbPantallas_pant_URL		UNIQUE(pant_URL)
);
GO

CREATE TABLE acce.tbRolesXPantallas(
	ropa_Id					INT IDENTITY(1,1),
	role_Id					INT,
	pant_Id					INT,

	ropa_UsuaCreacion		INT				NOT NULL,
	ropa_FechaCreacion		DATETIME		NOT NULL

	CONSTRAINT PK_acce_tbRolesXPantallas_ropa_Id						PRIMARY KEY(ropa_Id),
	CONSTRAINT FK_acce_tbRolesXPantallas_tbRoles_role_Id				FOREIGN KEY(role_Id)				REFERENCES acce.tbRoles(role_Id),
	CONSTRAINT FK_acce_tbRolesXPantallas_tbPantallas_pant_Id			FOREIGN KEY(pant_Id)				REFERENCES acce.tbPantallas(pant_Id),
	CONSTRAINT FK_acce_tbRoles_tbUsuarios_ropa_UsuaCreacion_usua_Id		FOREIGN KEY(ropa_UsuaCreacion)		REFERENCES acce.tbUsuarios(usua_Id)
);
GO


--ESQUEMA GENERAL
CREATE TABLE gral.tbDepartamentos(
	depa_Id  					INT IDENTITY(1,1),
	depa_Codigo					CHAR(2)			NOT NULL,
	depa_Nombre 				NVARCHAR(100)	NOT NULL,

	depa_UsuaCreacion			INT				NOT NULL,
	depa_FechaCreacion			DATETIME		NOT NULL,
	depa_UsuaModificacion		INT,
	depa_FechaModificacion		DATETIME,
	depa_Estado					BIT NOT NULL CONSTRAINT DF_depa_Estado DEFAULT(1)
	CONSTRAINT PK_gral_tbDepartamentos_depa_Id 											PRIMARY KEY(depa_Id),
	CONSTRAINT UC_gral_tbDepartamentos_depa_Nombre										UNIQUE(depa_Nombre),
	CONSTRAINT UC_gral_tbDepartamentos_depa_Codigo										UNIQUE(depa_Codigo),
	CONSTRAINT FK_gral_tbDepartamentos_acce_tbUsuarios_depa_UsuCreacion_usua_Id  		FOREIGN KEY(depa_UsuaCreacion) 		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_gral_tbDepartamentos_acce_tbUsuarios_depa_UsuModificacion_usua_Id  	FOREIGN KEY(depa_UsuaModificacion) 	REFERENCES acce.tbUsuarios(usua_Id)
);
GO

CREATE TABLE gral.tbMunicipios(
	muni_Id					INT IDENTITY(1,1),
	muni_Codigo				CHAR(4)			NOT NULL,
	muni_Nombre				NVARCHAR(80)	NOT NULL,
	depa_Id					INT				NOT NULL,

	muni_UsuaCreacion		INT	NOT NULL,
	muni_FechaCreacion		DATETIME NOT NULL,
	muni_UsuaModificacion	INT,
	muni_FechaModificacion	DATETIME,
	muni_Estado				BIT	NOT NULL CONSTRAINT DF_muni_Estado DEFAULT(1)
	CONSTRAINT PK_gral_tbMunicipios_muni_Id											PRIMARY KEY(muni_Id),
	CONSTRAINT UC_gral_tbMunicipios_muni_Nombre_muni_Codigo_depa_Id					UNIQUE(muni_Nombre, muni_Codigo, depa_Id),
	CONSTRAINT UC_gral_tbMunicipios_muni_Codigo										UNIQUE(muni_Codigo),
	CONSTRAINT FK_gral_tbMunicipios_tbDepartamentos_depa_Id 						FOREIGN KEY(depa_Id) 						REFERENCES gral.tbDepartamentos(depa_Id),
	CONSTRAINT FK_gral_tbMunicipios_acce_tbUsuarios_muni_UsuaCreacion_usua_Id  		FOREIGN KEY(muni_UsuaCreacion) 				REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_gral_tbMunicipios_acce_tbUsuarios_muni_UsuaModificacion_usua_Id  	FOREIGN KEY(muni_UsuaModificacion) 			REFERENCES acce.tbUsuarios(usua_Id)
);
GO

CREATE TABLE gral.tbSucursales(
	sucu_Id					INT IDENTITY(1,1),
	sucu_Nombre				NVARCHAR(300)	NOT NULL,
	sucu_Direccion			NVARCHAR(600)	NOT NULL,
	muni_Id					INT				NOT NULL,

	sucu_Estado				BIT	NOT NULL CONSTRAINT DF_sucu_Estado DEFAULT 1,
	sucu_UsuaCreacion		INT				NOT NULL,
	sucu_FechaCreacion		DATETIME		NOT NULL,
	sucu_UsuaModificacion	INT,
	sucu_FechaModificacion	DATETIME

	CONSTRAINT PK_gral_tbSucursales_sucu_Id											PRIMARY KEY(sucu_Id),
	CONSTRAINT UC_gral_tbSucursales_sucu_Nombre										UNIQUE(sucu_Nombre),
	CONSTRAINT FK_gral_tbSucursales_tbMunicipios_muni_Id 							FOREIGN KEY(muni_Id) 				REFERENCES gral.tbMunicipios(muni_Id),
	CONSTRAINT FK_gral_tbSucursales_acce_tbUsuarios_sucu_UsuaCreacion_usua_Id		FOREIGN KEY(sucu_UsuaCreacion)		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_gral_tbSucursales_acce_tbUsuarios_sucu_Modificacion_usua_Id		FOREIGN KEY(sucu_UsuaModificacion)	REFERENCES acce.tbUsuarios(usua_Id)
);
GO

--ESQUEMA VIAJES
CREATE TABLE viaj.tbColaboradores(
	cola_Id					INT IDENTITY(1,1),
	cola_Nombres			NVARCHAR(300)	NOT NULL,
	cola_Apellidos			NVARCHAR(300)	NOT NULL,
	cola_Identidad			VARCHAR(13)		NOT NULL,
	cola_Direccion			NVARCHAR(600)	NOT NULL,
	muni_Id					INT				NOT NULL,
	cola_FechaNacimiento	DATE			NOT NULL,

	cola_Sexo				CHAR			NOT NULL,
	cola_Estado				BIT	NOT NULL CONSTRAINT DF_cola_Estado DEFAULT 1,
	cola_UsuaCreacion		INT				NOT NULL,
	cola_FechaCreacion		DATETIME		NOT NULL,
	cola_UsuaModificacion	INT,
	cola_FechaModificacion	DATETIME

	CONSTRAINT PK_viaj_tbColaboradores_cola_Id											PRIMARY KEY(cola_Id),
	CONSTRAINT UC_viaj_tbColaboradores_cola_Identidad									UNIQUE(cola_Identidad),
	CONSTRAINT CK_viaj_tbColaboradores_cola_Sexo										CHECK(cola_Sexo IN ('F', 'M')),
	CONSTRAINT FK_viaj_tbColaboradores_gral_tbMunicipios_muni_Id 						FOREIGN KEY(muni_Id) 				REFERENCES gral.tbMunicipios(muni_Id),
	CONSTRAINT FK_viaj_tbColaboradores_acce_tbUsuarios_cola_UsuaCreacion_usua_Id		FOREIGN KEY(cola_UsuaCreacion)		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_viaj_tbColaboradores_acce_tbUsuarios_cola_Modificacion_usua_Id		FOREIGN KEY(cola_UsuaModificacion)	REFERENCES acce.tbUsuarios(usua_Id)
);
GO

CREATE TABLE viaj.tbTransportistas(
	tran_Id					INT IDENTITY(1,1),
	tran_Nombres			NVARCHAR(300)	NOT NULL,
	tran_Apellidos			NVARCHAR(300)	NOT NULL,
	tran_Identidad			VARCHAR(13)		NOT NULL,
	tran_TarifaKm			DECIMAL(18, 2)	NOT NULL,
	tran_FechaNacimiento	DATE			NOT NULL,
	tran_Sexo				CHAR			NOT NULL,

	tran_Estado				BIT	NOT NULL CONSTRAINT DF_tran_Estado DEFAULT 1,
	tran_UsuaCreacion		INT				NOT NULL,
	tran_FechaCreacion		DATETIME		NOT NULL,
	tran_UsuaModificacion	INT,
	tran_FechaModificacion	DATETIME

	CONSTRAINT PK_viaj_tbTransportistas_tran_Id											PRIMARY KEY(tran_Id),
	CONSTRAINT UC_viaj_tbTransportistas_tran_Identidad									UNIQUE(tran_Identidad),
	CONSTRAINT CK_viaj_tbTransportistas_tran_Sexo										CHECK(tran_Sexo IN ('F', 'M')),
	CONSTRAINT FK_viaj_tbTransportistas_acce_tbUsuarios_tran_UsuaCreacion_usua_Id		FOREIGN KEY(tran_UsuaCreacion)		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_viaj_tbTransportistas_acce_tbUsuarios_tran_Modificacion_usua_Id		FOREIGN KEY(tran_UsuaModificacion)	REFERENCES acce.tbUsuarios(usua_Id)
);
GO

CREATE TABLE viaj.tbSucursalesXColaboradores(
	suco_Id					INT IDENTITY(1,1),
	sucu_Id					INT				NOT NULL,
	cola_Id					INT				NOT NULL,

	suco_DistanciaKm		DECIMAL(18, 2)	NOT NULL,
	suco_UsuaCreacion		INT				NOT NULL,
	suco_FechaCreacion		DATETIME		NOT NULL

	CONSTRAINT PK_viaj_tbSucursalesXColaboradores_suco_Id											PRIMARY KEY(suco_Id),
	CONSTRAINT UC_viaj_tbSucursalesXColaboradores_sucu_Id_cola_Id									UNIQUE(sucu_Id, cola_Id),
	CONSTRAINT FK_viaj_tbSucursalesXColaboradores_gral_tbSucursales_sucu_Id 						FOREIGN KEY(sucu_Id) 				REFERENCES gral.tbSucursales(sucu_Id),
	CONSTRAINT FK_viaj_tbSucursalesXColaboradores_tbColaboradores_sucu_Id 							FOREIGN KEY(cola_Id) 				REFERENCES viaj.tbColaboradores(cola_Id),
	CONSTRAINT FK_viaj_tbSucursalesXColaboradores_acce_tbUsuarios_suco_UsuaCreacion_usua_Id			FOREIGN KEY(suco_UsuaCreacion)		REFERENCES acce.tbUsuarios(usua_Id)
);
GO

CREATE TABLE viaj.tbViajes(
	viaj_Id					INT IDENTITY(1,1),
	viaj_FechaYHora			DATETIME		NOT NULL,
	viaj_TotalKm			DECIMAL(18, 2)	NOT NULL,
	sucu_Id					INT				NOT NULL,
	tran_Id					INT				NOT NULL,

	viaj_Estado				BIT	NOT NULL CONSTRAINT DF_viaj_Estado DEFAULT 1,
	viaj_UsuaCreacion		INT				NOT NULL,
	viaj_FechaCreacion		DATETIME		NOT NULL,
	viaj_UsuaModificacion	INT,
	viaj_FechaModificacion	DATETIME

	CONSTRAINT PK_viaj_tbViajes_viaj_Id													PRIMARY KEY(viaj_Id),
	CONSTRAINT FK_viaj_tbViajes_gral_tbSucursales_sucu_Id 								FOREIGN KEY(sucu_Id) 				REFERENCES gral.tbSucursales(sucu_Id),
	CONSTRAINT FK_viaj_tbViajes_tbTransportistas_tran_Id 								FOREIGN KEY(tran_Id) 				REFERENCES viaj.tbTransportistas(tran_Id),
	CONSTRAINT FK_viaj_tbViajes_acce_tbUsuarios_viaj_UsuaCreacion_usua_Id		FOREIGN KEY(viaj_UsuaCreacion)		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_viaj_tbViajes_acce_tbUsuarios_viaj_Modificacion_usua_Id		FOREIGN KEY(viaj_UsuaModificacion)	REFERENCES acce.tbUsuarios(usua_Id)
);
GO

CREATE TABLE viaj.tbViajesDetalles(
	vide_Id					INT IDENTITY(1,1),
	viaj_Id					INT				NOT NULL,
	cola_Id					INT				NOT NULL,

	vide_Estado				BIT	NOT NULL CONSTRAINT DF_vide_Estado DEFAULT 1,
	vide_UsuaCreacion		INT				NOT NULL,
	vide_FechaCreacion		DATETIME		NOT NULL,
	vide_UsuaModificacion	INT,
	vide_FechaModificacion	DATETIME

	CONSTRAINT PK_viaj_tbViajesDetalles_vide_Id											PRIMARY KEY(vide_Id),
	CONSTRAINT FK_viaj_tbViajesDetalles_tbViajes_viaj_Id 								FOREIGN KEY(viaj_Id) 				REFERENCES viaj.tbViajes(viaj_Id),
	CONSTRAINT FK_viaj_tbViajesDetalles_tbColaboradores_cola_Id 						FOREIGN KEY(cola_Id) 				REFERENCES viaj.tbcolaboradores(cola_Id),
	CONSTRAINT FK_viaj_tbTransportistas_acce_tbUsuarios_vide_UsuaCreacion_usua_Id		FOREIGN KEY(vide_UsuaCreacion)		REFERENCES acce.tbUsuarios(usua_Id),
	CONSTRAINT FK_viaj_tbTransportistas_acce_tbUsuarios_vide_UsuaModificacion_usua_Id	FOREIGN KEY(vide_UsuaModificacion)	REFERENCES acce.tbUsuarios(usua_Id)
);
GO