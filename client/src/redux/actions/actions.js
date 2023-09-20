import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS"
export const POST_DOGS = "POST_DOGS";
export const GET_DOGS_FOR_TEMP = "GET_DOGS_FOR_TEMP";
export const GET_DOGS_FOR_API = "GET_DOGS_FOR_API";
export const GET_DOG_FOR_ID = "GET_DOG_FOR_ID";
export const POST_DOGS_CREATE = "POST_DOGS_CREATE"



export function getDogs(){
    return async function(dispatch){
        const response  = await axios("http://localhost:3001/dogs");
        
        
        return dispatch({
            type: GET_DOGS,
            payload: response.data
        })
    }  
}

export function getById(id) {
    return async function (dispatch) {
      const response = await axios(`http://localhost:3001/dogs/${id}`)
      
      console.log(response.data);
      return dispatch({ 
          type: GET_DOG_FOR_ID,
          payload: response.data 
        });
    };
}

export function getByName(name){
    return async function(dispatch){
        try {
            const response  = await axios(`http://localhost:3001/dogs/?name=${name}`);
       
        
        return dispatch({
            type: GET_BY_NAME,
            payload: response.data,
        })
        } catch (error) {
            console.log("Perrito no existe en base de datos!!");
            alert("Perrito no existe en base de datos!!")
        }
        
    }  
}

export function getTemperaments(){
    return async function(dispatch){
        const response  = await axios("http://localhost:3001/dogs/temperaments");
        
        
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: response.data
        })
    }  
}

export function postDog() {
    return async function (dispatch) {
            const response = await axios.get('http://localhost:3001/dogs');
            let aux = response.data.filter(el=> {
                return el.Created === true
            });
            console.log(aux);
            return dispatch({
                type: POST_DOGS,
                payload: aux
            });
            
    }
}

export function postDogCreate(newDog) {
    return async function (dispatch) {
        try {
            // Realizar la solicitud POST para crear un nuevo perro
            const response = await axios.post('http://localhost:3001/dogs', newDog);
      
            // Dispatch una acción con la respuesta o realiza alguna otra lógica si es necesario
            dispatch({
              type: POST_DOGS_CREATE,
              payload: response.data
            });
            
            // Opcional: Puedes devolver la respuesta si deseas utilizarla en el componente
            return response.data;
          } catch (error) {
            // Manejar errores, por ejemplo, dispatch de una acción de error
            console.error("Error al crear un nuevo perro:", error);
            // Opcional: Puedes devolver el error si deseas utilizarlo en el componente
            throw error;
          }
        
}
}


export function postDogApi() {
    return async function (dispatch) {
            const response = await axios.get('http://localhost:3001/dogs');
            let aux = response.data.filter(el=> {
                return el.created === false
            });
            console.log(aux);
            return dispatch({
                type: GET_DOGS_FOR_API,
                payload: aux
            });
            // return response;
    }
}

export function getDogsForTemperament(temp) {
    return async function (dispatch) {
       const response =  await axios.get("http://localhost:3001/dogs")
        let aux = response.data.filter((el) => {
          return el.temperament && el.temperament.split(", ").includes(temp);
        });
  
        dispatch({ 
            type: GET_DOGS_FOR_TEMP,
            payload: aux })
    };
  }
  

