const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'la contraseña es obligatoria'],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    emun: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// lo que hago con la siguiente funcion lo que hago es ocultar los paramos version y contraseña en la base de datos
// para luego tambien cuando sea llamado desde el front esos campos no sean visibles
// uso el parametro rest para que mande todos los campos menos los mensinados antes
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};
module.exports = model('Usuario', UsuarioSchema);
