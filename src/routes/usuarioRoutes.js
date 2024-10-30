const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuarioController');

router.get('/usuarios',usuarioController.listarUsuarios);
router.get('/usuarios/nome/:nome',usuarioController.listarUsuarioNome);

module.exports = router;