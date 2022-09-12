import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductos } from "../../redux/actions/getProductos";
import { deleteAllProducts } from "../../redux/actions/deleteAllProducts";

export default function LimpiarBd() {
    const dispatch = useDispatch();
    let productosSelector = useSelector(
      (state) => state.rootReducer.productos
    );
    useEffect(() => {
        if (!localStorage.getItem("Presupuesto")) {        
          localStorage.setItem("Presupuesto", "[]");
        }
  
          !productosSelector.length
          ? dispatch(getProductos())
          : console.log("hecho");

      }, [dispatch]);
      const limpiarBd = () => {

        for(let i=0; i<productosSelector.length; i++){
            dispatch(deleteAllProducts(productosSelector[i].id))
            
        }

      }
  

    return(
        <div>            
               <div><button class="aceptar" onClick={() => limpiarBd()}>Limpiar Base de datos</button></div>
        </div>
    )
}
