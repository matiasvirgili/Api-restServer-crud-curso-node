const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require('../helpers/db-validators')
const {
  usuariosGet,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
  usuariosPost,
} = require('../controllers/usuarios')

const router = Router()

router.get('/', usuariosGet)

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut,
)

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), // valida que no este vacio
    check(
      'password',
      'El password es obligatorio y debe tener mas de 6 caracteres',
    ).isLength({ min: 6 }), // pregunta si contiene 6 caracteres
    check('correo', 'El correo no es valido').isEmail(), //pregunta si esto es un email
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), //se fija si los roles q recibe esten en el arreglo
    check('rol').custom(esRoleValido),
    validarCampos, // llamo a las validaciones
  ],
  usuariosPost,
)

router.patch('/', usuariosPatch)

router.delete(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete,
)

module.exports = router
