const { createDogDb, getBreedById, getAllBreed, getBreedByName, getTemperaments } = require("../controllers/dogsControllers");
const {Temperaments} = require('../db');
// const dogs_temperaments = require("../db");


// query para que me ayude a buscar el perro por  nombre 
const getBreedHandler = async(req,res) => {
    const{name} = req.query;
    
    try {
        if(name){
            const lowercaseName = name.toLowerCase();
            const breedByName = await getBreedByName(lowercaseName);
            res.status(200).json(breedByName)
        }else{
            const response = await getAllBreed()
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }

};


// el id lo recibo por params 
const getDetailHandler = async(req,res) => { 
    const { id } = req.params
    
    const source = isNaN(id) ? "bdd" : "api"
    
    try {
        const response = await getBreedById(id,source)
        res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
};

const urlImg = "https://img.freepik.com/vector-premium/lindo-labrador-retriever-perro-sentado-dibujos-animados-vector-icono-ilustracion-icono-naturaleza-animal-aislado_138676-6618.jpg?w=2000"
//  la informacion la recibo por body es lo que digita el usuario 
const createDogHandler = async(req,res) => {
    let {image, name, min_height, max_height, max_weight, min_weight,  life_span, temperament} = req.body;
    
    if (!image) { 
        image = (urlImg);
    }

    if( image && name && min_height && max_height && min_weight && max_weight && life_span && temperament){
        const response = await createDogDb(image, name, min_height, max_height, min_weight, max_weight, life_span, temperament)
        temperament.map(async el => {
            const addTemp = await Temperaments.findOne({ 
                where: { name: el }
            });
            console.log(addTemp.dataValues);
            response.addTemperaments(addTemp);
            // return response.temperament = addTemp.dataValues.name 
            
        })
        res.status(200).send(response);
    
    }else {  
        res.status(400).send("faltan datos para crear el perro ")
    }

};

const getTemperamentsHandler = async(req,res) => {
    const {temperament} = req.params
    try {
        const response = await getTemperaments(temperament)
            res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}



module.exports = {
    getBreedHandler,
    getDetailHandler,
    createDogHandler,
    getTemperamentsHandler
}

