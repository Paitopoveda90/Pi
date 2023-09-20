import Card from '../card/cardcomponent';
import React from 'react';
import './cards.css';

function Cards({dogsAll: filteredDogs, paginado}) {
  

  
  const [paginadoStart, paginadoEnd] = paginado;
  
  if (!Array.isArray(filteredDogs)) {
    return <div></div>;
  }
  
  return (
    <div className='cards'>
      {filteredDogs.slice(paginadoStart, paginadoEnd + 1).map((dog) => (
        <Card key={dog.id} dog={dog} />
      ))}
        </div>
  );
}

export default Cards;