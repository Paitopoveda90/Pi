import './create.css';
import { useState, useEffect,} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTemperaments, postDogCreate,getDogs  } from '../../redux/actions/actions';
import { Link, useHistory} from "react-router-dom";
import logoCre from "./logo.png"

function Create() {
  const dispatch = useDispatch();
  const history = useHistory()

  const allTemperaments = useSelector((state) => state.temperaments);


  useEffect(() => {
    // Despacha la acción para obtener el listado de temperamentos
    dispatch(getTemperaments());
  }, [dispatch]);

  const [showAlert, setShowAlert] = useState(false);

  const[input,setInput] = useState({
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span:  "",
    temperament: []
  });
  
  const[error,setError] = useState({ 
    name: "",
    min_height: "",
    max_height: "",
    min_weight: "",
    max_weight: "",
    life_span:  "",
    temperament: []
  });
  
  const validate=(input)=>{
    
    let errors = {};

    // Nombre
     
    if(input.name && !/^[a-zA-Z]*$/.test(input.name)) {
      errors.name = "El nombre no debe contener numeros ni valores especiales";
    }
    if(input.name.length < 2 || input.name.length > 20){
      errors.name = '* el nombre debe tener entre 2 y 20 caracteres'
    }
    if (input.name.charAt(0) !== input.name.charAt(0).toUpperCase()) {
    errors.name = '*La primera letra del nombre debe ser mayúscula';
  }

  // Altura
  if(!input.min_height || input.min_height <= 9){
    errors.min_height = '*la altura minima de debe ser igual o mayor a 10 cm'
  }
  if(!input.max_height || input.max_height <= 11){
    errors.max_height = '*la altura maxima de debe ser mayor'
  }

  if(Number(input.min_height) >= Number(input.max_height)){
    errors.max_height = '*la altura maxima no puede ser menor que la altura minima'
  }

  if (!/\d{1,2}/gi.test(input.min_height)) {
     errors.min_height = "*debes ingresar valores numéricos";
     }
  
  if (!/\d{1,2}/gi.test(input.max_height)) {
      errors.max_height = "*debes ingresar valores numéricos";
     }
  
    // Peso 

    if (!input.min_weight || input.min_weight <= 0){
      errors.min_weight = '*el peso minimo debe ser mayor'
      }
      
    if (!input.max_weight || input.max_weight <= 0){
        errors.max_weight = '*el peso maximo debe ser mayor'
      }

    if(Number(input.min_weight) >= Number(input.max_weight)){
        errors.max_weight = '*el peso maximo no puede ser menor que el peso minimo'
    }

    if(!/\d{1,2}/gi.test(input.min_weight)){
        errors.min_weight = '*debes ingresar valores numéricos'
    }

    if(!/\d{1,2}/gi.test(input.max_weight)){
          errors.max_weight = '*debes ingresar valores numéricos'
    }
   

    // Años de vida

    if (!input.life_span || input.life_span < 7 || input.life_span > 15){
      errors.life_span = '*la duracion de vida debe ser entre 7 y 15 años'
    }

    if(!/\d{1,2}/gi.test(input.life_span)){
      errors.life_span = '*Debes ingresar valores numéricos'
    }



    return errors;
  }

  function handleChange(e){
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    });

    const validations = validate({
      ...input,
      [name]: value
    });

    setError(validations);
  
  }


  function handleSelect(e) {
    const selectedTemperament = e.target.value;
  
    if (!input.temperament.includes(selectedTemperament)) {
      setInput({
        ...input,
        temperament: [...input.temperament, selectedTemperament],
      });
    }else {
      // Mostrar la alerta si el temperamento ya está en la lista
      setShowAlert(true);

      // Ocultar la alerta después de un cierto tiempo
      setTimeout(() => {
        setShowAlert(false);
      }, 5000); // 5 segundos
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(input);

  if (
    !validationErrors.name &&
    !validationErrors.min_weight &&
    !validationErrors.min_height &&
    !validationErrors.max_weight &&
    !validationErrors.max_height &&
    !validationErrors.life_span

  ) {
    try {
       dispatch(postDogCreate(input));

      // Después de crear el perro, obtener la lista actualizada de perros
      await dispatch(getDogs());

      alert("Tu Perrito ha sido creado con Exito!!");
      
      setInput({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        temperament: [],
      });
    } catch (error) {
      console.error("Error al crear el perro:", error);
    }
    } else {
      return alert("Los campos con (*) son requeridos.");
    }
    history.push("/home");
  }





  return (
    <div className='contenedor_create'>
    <div className='contenedor_create1'>
      <div className='barra_create'>
        <Link to= "/">
        <img className= "logoCre" src={logoCre} alt="" />
        </Link>
        <Link className= "enlace_create" to= "/home">
        <h2>Home</h2>
        </Link>
      </div>
    <div className='contenido'>
    <div className='cont_img'>
      <div className='cont_img1'>
        {/* <span className='span'>?</span> */}
        <img alt="" src='https://img.freepik.com/vector-premium/lindo-labrador-retriever-perro-sentado-dibujos-animados-vector-icono-ilustracion-icono-naturaleza-animal-aislado_138676-6618.jpg?w=2000'></img>
        {/* <label className='label_img'>Imagen</label> */}
        {/* <input  className='input_img' type = "text" name = "image" value={input.image} onChange = {handleChange}/> */}
      </div> 
    </div>
      <form className= "formulario" onSubmit={handleSubmit}>

        <div>
          <label className='label'> Nombre*</label>
          <input className='input_create1' type = "text" name ="name" value={input.name} onChange = {handleChange}/>
          <span className='span_error'>{error.name}</span>
        </div>

        <div>
          <label className='label'> Altura Minima*</label>
          <input className='input_create2' type = "text" name = "min_height" value={input.min_height} onChange = {handleChange}/>
          <span className='span_error'>{error.min_height}</span>
        </div>

        <div>
          <label className='label'> Altura Maxima*</label>
          <input className='input_create3' type = "text" name = "max_height" value={input.max_height} onChange = {handleChange}/>
          <span className='span_error'>{error.max_height}</span>
        </div>

        <div>
          <label className='label'> Peso Minimo*</label>
          <input className='input_create4' type = "text" name = "min_weight" value={input.min_weight} onChange = {handleChange}/>
          <span className='span_error'>{error.min_weight}</span>
        </div>

        <div>
          <label className='label'> Peso Maximo*</label>
          <input className='input_create5' type = "text" name = "max_weight" value={input.max_weight} onChange = {handleChange}/>
          <span className='span_error'>{error.max_weight}</span>
        </div>

        <div>
          <label className='label'> Años de vida*</label>
          <input className='input_create6' type = "text" name = "life_span" value={input.life_span} onChange = {handleChange}/>
          <span className='span_error'>{error.life_span}</span>
        </div>


      <div>
        <label className='label'>Temperamento</label>
        <select className= "selec_tem" name="temperament" value={input.temperament} onChange={handleSelect}>
        <option value="">Seleccione un temperamento</option>
        {allTemperaments.map((temperaments) => (
          <option key={temperaments} value={temperaments}>
        {temperaments}
        </option>
        ))}
        </select>
        <span>{error.temperament}</span>
      </div>

      <div className='cont_temp'>
          {input.temperament.map((el) => (
            <div className='temp' key={el} >
          <p className='tex'><b>{el}</b></p>
          <div className= "cerrar" onClick={()=>handleDelete(el)}><b>X</b></div>
          </div>))}
      </div>

      {showAlert && <div className={`alert ${showAlert ? '' : 'hidden'}`}>Este temperamento ya está incluido</div>}

      <div >
          <Link to="/home">
          <button className='botones'>Cancelar</button>
          </Link>
          <button className='botones' type="submit">
            Crear
          </button>
      </div>
        
      </form>
      
    </div>
    </div>
    </div>
  );

}

export default Create;
