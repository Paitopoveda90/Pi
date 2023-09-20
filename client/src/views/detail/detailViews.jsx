import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getById } from "../../redux/actions/actions"

import './detail.css';
// import { Link } from "react-router-dom";
import logoDet from "./logo.png"

function Detail() {

  const dispatch = useDispatch();
  const  {id}  = useParams();

  let dogData = useSelector((state) => state.details);

  console.log(dogData);

  useEffect(() => {
    dispatch(getById(id));
  }, [dispatch, id]);




  return (
    <div className="contenedor_det">
      <div className="contenedor_det1">
        <div className="barra">
        <Link to= "/">
        <img className= "logoDet" src={logoDet} alt="" />
        </Link>
        <Link className= "enlace_det" to= "/home">
        <h2>Home</h2>
        </Link>
        </div>

        <div className="contenedor_info">
          <div>
            <img className= "imagen" alt="" src={dogData.image} />
          </div>

          <div className="info_det">

            <h1>{dogData.name}</h1>

            <div>
                <p>
                  <b>Altura:   </b> 
                  <span>{dogData.min_height}</span> -
                  <span>{dogData.max_height}</span> cms
                </p>
                <p>
                <b>Peso:   </b>
                  <span>{dogData.min_weight}</span> -
                  <span>{dogData.max_weight}</span> Kgs
                </p>
                <p>
                <b>Años de vida:   </b>
                <span> {dogData.life_span}</span>
                </p>
                <p>
                <b>Temperamentos:   </b>
                <span> {dogData.temperament}</span>
                </p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;