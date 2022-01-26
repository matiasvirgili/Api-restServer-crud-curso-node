const bcryptjs = require('bcryptjs');
const response = require('express');
const generarJWT = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    // verificar el email
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res
        .status(400)
        .json({ msg: 'Usuario / Password no son correctos' });
    }
    //si el usuario esta activo
    if (!usuario.estado) {
      return res
        .status(400)
        .json({ msg: 'El estado del usuario no esta activo' });
    }
    //verificar la contrasenia
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'El password no es valido' });
    }

    //generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'Algo salio mal' });
  }
};

module.exports = login;
