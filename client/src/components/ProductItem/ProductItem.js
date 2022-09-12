import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {deleteProduct} from "../../redux/actions/deleteProduct";
import {addProducts} from "../../redux/actions/addProducts";
import { getAuth } from "firebase/auth";
import "./ProductItem.css";


export default function ProductItem({ id,
  nombre,
  preciodistribuidor,
  descdistribuidor,
  costocuellar,
  totalconporcentaje,
  porcentaje,
  image

}) {
  const dispatch = useDispatch();

	const[input, setInput] = useState({
		cantidad:1,
	})

  const[modificar, setModificar] = useState(false)
  const[agregarProducto, setAgregarProducto] = useState(false)

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if(Product) input.cantidad=Product.quantity
    if(!localStorage.getItem("Presupuesto")) {
      localStorage.setItem("Presupuesto", "[]");
    }
  }, []);




  function handleChange(e) {
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    console.log(input)
  }

let arrayPresupuesto = JSON.parse(localStorage.getItem("Presupuesto"));
let Product = arrayPresupuesto.find(
  (item) => item?.id == id
);


function agregar() {
  setAgregarProducto(true)
  let objetoCantidad={id:id, quantity:input.cantidad}
  dispatch(addProducts(objetoCantidad))
  let Product = arrayPresupuesto.find(
    (item) => item.id == id
  );
  input.cantidad=Product.quantity
}

function modificarCantidad() {
  setModificar(true)
  console.log("Modificar",modificar)
}

function aceptar() {
  setModificar(false)
  let objetoCantidad={id:id, quantity:input.cantidad}
  dispatch(addProducts(objetoCantidad))
  let arrayPresupuesto = JSON.parse(localStorage.getItem("Presupuesto"));
  let Product = arrayPresupuesto.find(
    (item) => item.id == id
  );
  input.cantidad=Product.quantity
}

function cancelar() {
  setModificar(false)
  let arrayPresupuesto = JSON.parse(localStorage.getItem("Presupuesto"));
  let Product = arrayPresupuesto.find(
    (item) => item.id == id
  );
  input.cantidad=Product.quantity
}

function quitar(){
    dispatch(deleteProduct(id))
    input.cantidad=1
    setModificar(false)
    setAgregarProducto(false)
    let arrayPresupuesto = JSON.parse(localStorage.getItem("Presupuesto"));
    let Product = arrayPresupuesto.find(
      (item) => item.id == id
    );

}



  return (
    <div>
      {true===true ? (           

                    <div class="card">
                      <div class="card-body ">
                      <h5 class="card-title card-main c-name ">{nombre}</h5>
                        <img src={image } />

                        <p class="card-text card-main c-city ">
                          Código Producto:{id}
                        </p>
                        <hr></hr>

                        <p class="card-text  card-main c-hotel card-p ">
                        Precio Distribuidor: {preciodistribuidor}
                        </p>

                        <p class="card-text  card-main c-hotel card-p ">
                          Descuento distribuidor: {descdistribuidor}
                        </p>
                        <p class="card-text  card-main c-hotel card-p ">
                          Costo Cuellar: {costocuellar}
                        </p>
                        <p class="card-text  card-main c-hotel card-p ">
                          Total con Porcentaje: {totalconporcentaje}
                        </p>
                        <p class="card-text  card-main c-hotel card-p ">
                          Porcentaje de recargo: {porcentaje}
                        </p>
                        <p class="card-text  card-main c-price ">Precio Cliente: $ {totalconporcentaje}</p>
                        <hr></hr>
                        <p class="card-text  card-main c-price ">Agregar Cantidad:</p>



                        {(Product && modificar) ? 
                          (<div>
                            <input                              
                              type="number"	
                              value={input.cantidad}    	
                              name="cantidad"
                              onChange={(e) => handleChange(e)}
                            />
                            <div>Producto agregado al presupuesto</div> 
                            <div>
                              <button
                                  type="button"
                                  className="btn btn-warning btn-block btn-lg ml-2 pay-button bb"
                                  onClick={() => aceptar()}
                                >
                                  Aceptar
                              </button>
                              </div>
                            <div>
                            <button className="btn btn-danger btn-lg" onClick={() => cancelar()}>
                                Cancelar
                            </button>
                                                            
                            </div>
                          </div>)
                        : Product ? (<div>
                          <input
                              disabled
                              type="number"	
                              value={input.cantidad}   	
                              name="cantidad"
                              onChange={(e) => handleChange(e)}
                            />
                            <div>Producto agregado al presupueto</div>
                            <div>
                              
                            <button
                                type="button"
                                className="btn btn-warning btn-block btn-lg ml-2 pay-button bb"
                                onClick={() => modificarCantidad()}
                              >
                                 Modificar Cantidad
                            </button>
                              
                            </div>
                            <br></br>
                            <div>
                            <button className="btn btn-danger btn-lg" onClick={() => quitar()}>
                                Quitar del Presup.
                            </button>
                        </div>
                        </div>) 
                        : (<div >

                            <input                              
                              type="number"	
                              value={input.cantidad}   	
                              name="cantidad"
                              onChange={(e) => handleChange(e)}
                            />
                              <div>
                                
                            <button
                                type="button"
                                className="btn btn-warning btn-block btn-lg ml-2 pay-button bb"
                                onClick={() => agregar()}
                              >
                                  Agregar al Presupuesto
                            </button>
                        </div>
                              
                        </div>)
                        }

                      </div>
                    </div>
      ) : (
            null
      )}
    </div>
  );
}
