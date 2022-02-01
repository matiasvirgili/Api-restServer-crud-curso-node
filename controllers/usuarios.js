const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  // const usuarios = await Usuario.find({ estado: true })
  //   .limit(Number(limite))
  //   .skip(Number(desde))

  // const total = await Usuario.countDocuments({ estado: true })

  // res.json({ total, usuarios })

  //Al utilizar este codigo resdusco el tiempo que tardan en ejecutarse las promesas
  //Porque de esta manera ejecuto las dos promesas al mismo tiempo
  //Antes lo que hacia es ejecutar una y luego la otra

  //Desestructuro las dos promesas la priera hace referencia al total y la segunda a los usuarios
  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).limit(Number(limite)).skip(Number(desde)),
  ]);

  res.json({ total, usuarios });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;

  //Extraigo todo lo que no voy a necesitar que se actualice o se muestre
  const { password, correo, ...resto } = req.body;

  // Validar contra la base de datos

  // si viene la contraseña es porque la quiere cambiar entonces debemos verificar que sea esa la persona, etc
  if (password) {
    //Encriptar la contra
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  //Actualizo todos los datos en la base de datos
  const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);
  res.json(usuarioDB);
};

const usuariosPost = async (req, res = response) => {
  //capturar errores

  //campos que son obligatorios y requeridos
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contra
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en base de datos
  await usuario.save();

  //devuelvo el usuario creado
  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - controlador',
  });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  // lo elimino fisicamente de la base de datos
  // const usuario = await Usuario.findByIdAndDelete(id)

  // Cambio el estado a false pero nunca hago la baja fisica
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    {
      new: true,
    }
  );
  res.json({ usuario });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
};
