import './navbar.css';

function Navbar({handleChange, handleSubmit }) {
  return (
    <div >
      <form className='search' >
        <input className='input' placeholder='Buscar...' type='search' onChange = {handleChange}/>
        <button className='boton1' type= 'submit' onClick = {handleSubmit}> Buscar </button>

      </form>
    </div>
  );
}

export default Navbar;