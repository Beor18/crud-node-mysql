# CRUD - NodeJS - MySQL

Curso de NodeJS dictado por la Universidad Tecnológica Nacional (UTN) - Evaluación Final.
- Profesora Ing. M. Verónica Piñeyro.
- Alumno: Fernando Gabriel López

### Instalación

Tener instalado [Node.js](https://nodejs.org/) y [MySQL](https://www.google.com).

Instalar las dependencias y ejecutar el server:

#### Actualización 4 de Septiembre 2018
- Agregado Nodemailer (formulario contacto) y las consultas se guardan en la base de datos

```sh
$ Importar Base de Datos .sql que se adjunta
$ crear carpeta public/images
$ editar app.js y poner user y pass de la base de datos mysql
$ editar index.js las opciones de nodemailer ingresando su correo y pass en donde dice router.post(/contacto)
$ npm install
$ npm start
```

#### Base de Datos.
Una base de datos que contenga las siguientes 2 tablas.

- Tabla Productos
```
id
nombre
descripcion
precio
imagen
created_at
```

- Tabla Contacto
```
id
nombre
email
consulta
created_at
```