const {Dog, Temperaments} = require('../db');
const axios = require('axios');
const {API_KEY} = process.env;

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

 


const createDogDb = async (image, name, min_height, max_height, min_weight, max_weight, life_span) => {
    try {
        const createDog = await Dog.create({
            image,
            name,
            min_height,
            max_height,
            min_weight,
            max_weight,
            life_span,
            
        });


        console.log("Perro creado");
        console.log(createDog);
        
        return createDog; // Devuelve el objeto del perro que se agregó
    } catch (error) {
        console.log(error);
        throw error; // Re-lanza el error para que pueda ser manejado en el manejador
    }
};


// con esto me traigo solo la info que requiero de la api 
const infoCleaner = (arr) => { 
    return arr.map((breed) => {
        const imageUrl = `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
    return {
        id: breed.id,
        name: breed.name,
        image: imageUrl,
        breed_group: breed.breed_group,
        temperament: breed.temperament,
        life_span: breed.life_span,
        min_weight: parseInt(breed.weight.metric.slice(0, 2).trim()),
        max_weight: parseInt(breed.weight.metric.slice(4).trim()),
        min_height: parseInt(breed.height.metric.slice(0, 2).trim()),
        max_height: parseInt(breed.height.metric.slice(4).trim()),
        created: false,
    };
    });
};


const infoOrd = (breed)=>{
        return{
        id: breed.id,
        name: breed.name,
        min_height: breed.min_height,
        max_height: breed.max_height,
        min_weight: breed.min_weight,
        max_weight: breed.max_weight,
        life_span: breed.life_span,
        image: breed.image,
        temperament: breed.Temperaments.map((i) => { 
          return i.name;
        }).join(", "),
        Created: true,
    }
    };


const infoOrdAll = (arr) =>{
    return arr.map((breed)=>{
        return{
        id: breed.id,
        name: breed.name,
        min_height: breed.min_height,
        max_height: breed.max_height,
        min_weight: breed.min_weight,
        max_weight: breed.max_weight,
        life_span: breed.life_span,
        image: breed.image,
        temperament: breed.Temperaments.map((i) => {
          return i.name;
        }).join(", "),
        Created: true,
    }
    });
}

const getBreedByIdFromApi = async (id) => {
    const breed = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`)).data;
    const cleanedBreed = infoCleaner([breed])[0];
    return cleanedBreed;
  };
  

  const getBreedByIdFromDatabase = async (id) => {
    let breed = await Dog.findOne({
        where: { id },
        include:{
        model: Temperaments,
        attributes: ["name"],
        through: {
            attributes:[],
        }
    }
    });
    console.log("este es el brees = ", breed);
    const breedOrd = infoOrd(breed)
    return breedOrd
    
  };


const getBreedById = async(id,source) => {

    if (source === "api") {
        return getBreedByIdFromApi(id);
      } else {
        return getBreedByIdFromDatabase(id);
      }
    
};

const getAllBreed = async () => {
    const infoBD = await Dog.findAll({
        include:{
        model: Temperaments,
        attributes: ["name"],
        through: {
            attributes:[],
        }
    }
    });
    const dogDB = infoOrdAll(infoBD)
    const infoApi = (await axios.get(URL)).data;
    const dogApi = infoCleaner(infoApi);
    return [...dogDB,...dogApi];
};

const getBreedByName = async(name) => {
    const infoApi = (await axios.get(URL)).data;
        const dogApi = infoCleaner(infoApi);
        const lowercaseName = name.toLowerCase();
        const dogFiltered = dogApi.filter(breed =>breed.name.toLowerCase() === lowercaseName)

    const dogBD = await Dog.findAll({where: {name: lowercaseName}});

    return [...dogFiltered,...dogBD]
};


const getTemperaments = async() => {
    try {
        //Consulta si ya existen temperamentos en la base de datos
        const existingTemperaments = await Temperaments.findAll();

        // Si ya existen temperamentos, simplemente devuelve la lista existente
        if (existingTemperaments.length > 0) {
            const list = existingTemperaments.map((temperament) => temperament.name);
            console.log('Temperamentos ya existentes en la base de datos:');
            return list;
        }

        const temperaments = (await axios.get(URL)).data;
        const listTemperaments = temperaments.map((dog) => {
            if(!dog.temperament) return (dog.temperament = undefined);
            const listResult = dog.temperament.split(", ");
            return listResult
        });
    
        const listClear = listTemperaments.flat().filter(Boolean);
        const uniqueTemperament = new Set(listClear);
        const list = [...uniqueTemperament];
    
        await Temperaments.bulkCreate(
            list.map((temperament) => ({
                name: temperament,
            }))
        );
        console.log('Temperamentos insertados con éxito en la base de datos');
    
        return list;
        
    } catch (error) {
        console.error('Error al insertar temperamentos en la base de datos:', error.message);
    }
    
}


module.exports = {
    createDogDb,
    getBreedById,
    getAllBreed,
    getBreedByName,
    getTemperaments,
}