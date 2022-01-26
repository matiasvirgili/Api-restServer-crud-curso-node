const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {
  // el uid es el userID
  return new Promise((resolve, reject) => {
    const payload = { uid }; // en el payload puedo mandar cualquier cosa, nombre, apellido, dni, etc. lo mas seguro primero es verificar el userID
    jwt.sign(
      //el sing es para firmar el token, mando el payload y la clave secreta para saber que no fue editado
      payload,
      process.env.SECRETORPRIVATEKEY,
      { expiresIn: '4h' },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generarJWT;
