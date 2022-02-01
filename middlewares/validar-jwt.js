const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Lo que hago en esta funcion es privatizar las rutas mediante el token, el cual lo mando en el header de la peticion
const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({ msg: 'No hay token en la peticion' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //Leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({ msg: 'Usuario no existe en BD' });
    }
    //verificar si el uid osea el usuario que va a realizar la accion tiene estado true
    if (!usuario.estado) {
      return res.status(401).json({ msg: 'Estado: false' });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: 'token no valido' });
  }
};

module.exports = validarJWT;
