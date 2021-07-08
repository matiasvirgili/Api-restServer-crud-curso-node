const { validationResult } = require('express-validator')

const validarCampos = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    //el isEmpty() se fija si no tiene errores por eso negamos el errors para preguntar si hay errores
    return res.status(400).json(errors)
  }

  next()
}

module.exports = {
  validarCampos,
}
