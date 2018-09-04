const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

/* GET home page. */
router.get('/', async(req, res, next) => {
    const producto = "select * from productos WHERE nombre IS NOT null ORDER BY nombre DESC LIMIT 3";

    await con.query(producto, function(e, r) {
        res.render('index', {
            title: 'Express',
            productos: r
        });
    });
});

router.get('/productos', async(req, res, next) => {
    const producto = "select * from productos";

    await con.query(producto, function(e, r) {
        res.render('productos', {
            title: 'Express',
            productos: r
        });
    });
});

router.get("/productos/:id", async(req, res) => {
    await con.query("select * from productos where id=" + req.params.id, function(e, r) {
        res.render("ver.ejs", {
            person: r[0]
        });
    });
});

router.get('/contacto', async(req, res, next) => {
    const producto = "select * from contacto";

    await con.query(producto, function(e, r) {
        res.render('contacto', {
            title: 'Express',
            // productos: r
        });
    });
});

router.post("/", function(req, res) {

    //Subida de imagen a base de datos y carpeta
    if (req.method == "POST") {
        var nombre = req.body.nombre;
        var descripcion = req.body.descripcion;
        var precio = req.body.precio;

        if (!req.files)
            return res.status(400).send('Error.');

        var file = req.files.imagen;
        var img_name = "http://localhost:3000/images/" + file.name;

        if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

            file.mv('./public/images/' + file.name, function(err) {

                if (err)

                    return res.status(500).send(err);
                con.query("insert into productos (nombre,descripcion,precio,imagen,created_at) value (\"" + nombre + "\",\"" + descripcion + "\",\"" + precio + "\",\"" + img_name + "\",NOW())", function(e, r) {});
                res.redirect("/");
            });
        } else {
            message = "El formato no es valido, por favor suba lo siguiente '.png','.gif','.jpg'";
            res.render('index.ejs', { message: message });
        }
    } else {
        res.render('index.ejs');
    }
});

// Se edita contacto
router.get("/productos/editar/:id", async(req, res) => {
    await con.query("select * from productos where id=" + req.params.id, function(e, r) {
        res.render("editar.ejs", { person: r[0] });
    });
});

router.post("/productos/editar", function(req, res) {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;


    con.query("update productos set nombre=\"" + nombre + "\",descripcion=\"" + descripcion + "\",precio=\"" + precio + "\" where id=" + id, function(e, r) {});
    res.redirect("/productos/editar/" + id);
});

router.get("/productos/borrar/:id", function(req, res) {
    con.query("delete from productos where id=" + req.params.id, function(e, r) {});
    res.redirect("/");
});

module.exports = router;