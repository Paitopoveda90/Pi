const { Router,} = require('express');
const breedRouter = require ("./breedRouter");


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// const router = require("express").Router();
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', breedRouter );





module.exports = router;
