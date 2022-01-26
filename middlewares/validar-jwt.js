const { request, response } = require('express');
const jwt = require('jsonwebtoken');

// Lo que hago en esta funcion es privatizar las rutas mediante el token, el cual lo mando en el header de la peticion
const validarJWT = (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({ msg: 'No hay token en la peticion' });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'token no valido' });
  }
  next();
};

module.exports = validarJWT;
