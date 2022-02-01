const { response } = require('express');

const esAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere vertificar el role sin validar el token primero',
    });
  }

  const { rol, nombre } = req.usuario;

  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({ msg: `${nombre} no es administrador` });
  }
  next();
};

//operador rest, todos los roles que la persona mande, sean 13 o 23, se guardan en el arreglo
const tieneRol = (...roles) => {
  return (req, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere vertificar el role sin validar el token primero',
      });
    }

    if (roles.includes(req.usuario.rol)) {
      return (
        res.status(401),
        json({ msg: `El servicio requiere uno de estos roles ${roles}` })
      );
    }
    next();
  };
};

module.exports = { esAdminRole, tieneRol };
