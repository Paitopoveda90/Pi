const { Router,} = require('express');
const {getBreedHandler, getDetailHandler, createDogHandler, getTemperamentsHandler} = require('../handlers/breedHandler')

const breedRouter = Router();

breedRouter.get("/", getBreedHandler );

breedRouter.get("/name", getBreedHandler )

breedRouter.get("/temperaments", getTemperamentsHandler);

breedRouter.get("/:id", getDetailHandler);

breedRouter.post("/", createDogHandler)




module.exports = breedRouter;