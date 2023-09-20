import './card.css';
import { Link } from "react-router-dom";



function Card({dog}) {
  const {name, breed_group, image, id, temperament, min_weight, max_weight} = dog

  return (
    <div className='contenedor'>
      <div className='card1'>
    <div className='cardfront'>
      <img src={image} alt= "" />
    </div>
    <div className='cardback'>
      <div className='nombre'>
      <Link className= "enlace" to = {`/home/${id}`}>
      <h2>{name}</h2>
      </Link>
      </div>
      <div className='info'>
      <p>{breed_group}</p>
      <p><b>Temperamento: </b>{temperament}</p>
      <p><b>Peso: </b>{min_weight} - {max_weight}</p>
      </div>
    </div>  
      </div>
    </div>
  );
}

export default Card;