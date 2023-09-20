import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getDogs, getTemperaments, postDog, postDogApi, getDogsForTemperament} from '../../redux/actions/actions';


import logoHome from "./logo.png"
import flecha from "./fecha_blanca.png"

import Cards from '../../components/cards/cardscomponent';
import Navbar from '../../components/navbar/navbarcomponent';

import './home.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


function Home() {

  const dispatch = useDispatch();
  let dogsAll = useSelector((state)=> state.dogs);
  const [searchString, setSearchString] = useState("")
  const [paginado, setPaginado] = useState([0, 7]);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [filteredDogs, setFilteredDogs] = useState([])
  const [appliedFilters, setAppliedFilters] = useState(false);
  
  
  function handleChange(e){
    e.preventDefault();
    setSearchString(e.target.value.toLowerCase());
  };
  
  function handleSubmit(e){
    e.preventDefault()
    
    if(searchString.length === 0){
      return alert("debes ingresa valores para la busqueda")
    }else{
      
      const trimmedSearchString = searchString.trim();
      const filtered = dogsAll.filter(dog=>dog.name.toLowerCase().includes(trimmedSearchString.toLowerCase()));
      
      
      dispatch(getByName(trimmedSearchString))
      setFilteredDogs(filtered);
      setSearchString("");
      setAppliedFilters(true); // Marco que se aplicaron filtros
    }
   }; 

   function handleResetFilters() {
    dispatch(getDogs()); // Cargar la lista completa de perros nuevamente
    setAppliedFilters(false); // Marco que no se aplican filtros
  }
  
  
  function act() {
    setPaginado([0, 7]);// para iniciar el paginado

    };

  function handlerClick(e) {
    if (e === "right") {
      let num_1 = paginado[0] + 8;
      let num_2 = paginado[1] + 8;
      if (num_2 >= filteredDogs.length) {
        num_1 = Math.max(filteredDogs.length - 8, 0);
        num_2 = filteredDogs.length - 1;
      }
      setPaginado([num_1, num_2]);
    } else {
      let num_1 = paginado[0] - 8;
      let num_2 = paginado[1] - 8;
      if (num_1 < 0) {
        num_1 = 0;
        num_2 = Math.min(filteredDogs.length - 1, 7);
      }
      setPaginado([num_1, num_2]);
    }
  };

  function handleOrder(e) {
    switch (e.target.value) {

      case "DESC":
        dogsAll = dogsAll.sort((b, a) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        act();
      break;

      case "ASC":
        dogsAll = dogsAll.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
        act();
      break;

      case "min_weight":
        dogsAll = dogsAll.sort((a, b) => {
          if (Number(a.min_weight) > Number(b.min_weight)) return 1;
          if (Number(a.min_weight) < Number(b.min_weight)) return -1;
          return 0;
        });
        act();
      break;

      case "max_weight":
        dogsAll = dogsAll.sort((b, a) => {
          if (Number(a.max_weight) > Number(b.max_weight)) return 1;
          if (Number(a.max_weight) < Number(b.max_weight)) return -1;
          return 0;
        });
        act();
      break;

      case "All":
        dispatch(getDogs());
        act();
      break;

      case "true":
        dispatch(postDog());
        act();
        break;

      case "false":
        dispatch(postDogApi());
        act();
      break;

      default:
        break;
    }

    setAppliedFilters(true);
  }; 

  function handleTemperament(e) {
    e.preventDefault();
    if (e.target.value === "Temperamentos") {
      // Si se selecciona "Temperamentos", restaurar la lista completa de perros
      dispatch(getDogs());
    } else {
      // De lo contrario, aplicar el filtro por temperamento
      dispatch(getDogsForTemperament(e.target.value));
    }
    setAppliedFilters(true);
  }


  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  // Manejar la búsqueda y la actualización de filteredDogs
  useEffect(() => {
    if (searchString) {
      const trimmedSearchString = searchString.trim();
      const filtered = dogsAll.filter((dog) =>
        dog.name.toLowerCase().includes(trimmedSearchString.toLowerCase())
      );
  
      if (filtered.length === 0) {
        // No se encontraron resultados, muestra una alerta al usuario
        alert("No se encontraron resultados para la búsqueda.");
      }
  
      setFilteredDogs(filtered);
      setPaginado([0, 7]);
    } else {
      setFilteredDogs(dogsAll);
      setPaginado([0, 7]);
    }
  }, [dogsAll, searchString]);
  

  return (
    <div className='home'>
      <div className='home1'>
      <div className='titulo'>
        <Link to= "/">
        <img className= "logoHome" src={logoHome} alt="" />
        </Link>
        <Navbar handleChange = {handleChange} handleSubmit = {handleSubmit}/>
        <hr className='hr'></hr>
        <Link className= "enlace1" to= "/create">
        <h2 className='crear'>Cear Perro</h2>
        </Link>
      </div>
      

      <div className='filtros'>
        <p className='texto'><b>Filtrar por:</b></p>
        <select className= "selector" onChange={handleOrder}>
          <option value="All">Fuente</option>
          <option value="false">Api</option>
          <option value="true">Creados</option>
        </select>
        <select className= "selector" onChange={handleTemperament}>
        <option value="Temperamentos">Temperamentos</option>
          {allTemperaments &&
            allTemperaments.map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
        </select>

            {appliedFilters && (
            <button className="botonf" onClick={handleResetFilters}>
              Todos los Perros
            </button>
            )}

        <p className='texto2' > <b>Ordenar por: </b></p>
        <select className= "selector" onChange={(e) => handleOrder(e)}>
          {/* <option value="x">Order...</option> */}
          <option value="ASC">A-Z</option>
          <option value="DESC">Z-A</option>
          <option value="min_weight">Peso minimo</option>
          <option value="max_weight">peso maximo</option>
        </select>

      </div>

      <div className='flechas_cards'>
        <div className='flecha_izquierda'>
          {paginado[0] === 0 ? (
          <img src={flecha} alt=""
            style={{ color: "transparent" }}
            onClick={() => handlerClick("left")}
          />
        ) : (
          <img src={flecha} alt=""
            onClick={() => handlerClick("left")}
          />
        )}
        </div>
          <Cards dogsAll = {filteredDogs} paginado={paginado} />
        <div className='flecha_derecha'>
        {paginado[1] > dogsAll.length ? (
          <img src={flecha} alt=""
            key={1}
            style={{ color: "transparent" }}
            onClick={() => handlerClick("right")}
          />
        ) : (
          <img src={flecha} alt=""
            onClick={() => handlerClick("right")}
          />
        )}
        
        </div>

      </div>
      </div>
    </div>
  );
}

export default Home;
