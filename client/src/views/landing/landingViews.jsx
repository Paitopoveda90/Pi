    import React from "react";
    import "./landing.css"
    import { Link } from "react-router-dom";
    import logo from "./logo.png"


    export function Landing() {
    return (
    <div className="container">
        <div>
            <img className= "logo" src={logo} alt="" />
            <div className="texto1">
            <p>"Los <b>perros</b> son a menudo más felices que los hombres, 
                simplemente porque las cosas más simples son las cosas 
                más grandes para ellos"</p>
            <p>Mehmet Murat Ildan</p>
            </div>
            <Link to={"/home"}>
            <button className="boton">Inicio</button>
            </Link>
        </div>
    </div>
    );
    }

    export default Landing;