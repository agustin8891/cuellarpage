import React, { useEffect, useState } from "react";
import "./homeBody.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductos } from "../../redux/actions/getProductos";
import { getAuth } from "firebase/auth";
import ProductItem from "../ProductItem/ProductItem";
import Paginado from "../Paginado/Paginado";
import Loaderpag from "../Loaderpag/Loaderpag";


export default function HomeBody() {
  let productos=[]
  const dispatch = useDispatch();



const allProducts = useSelector ((state) => state.rootReducer.productos) // esto es lo mismo que hacer el makstate to props	
const [currentPage, setCurrentPage] = useState(1) // esto es un estado local
const [productsPerPage, setproductsPerPage] = useState(12) //12 son los pokemons por pagina
const indexOfLastProduct=currentPage * productsPerPage // en un ppio esto va a ser 12
const indexOfFirstProduct = indexOfLastProduct - productsPerPage

let currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct)

const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)
}


let miPresupuesto = localStorage.getItem("Presupuesto");

  const auth = getAuth();
  const user = auth.currentUser;

    useEffect(() => {
      if (!localStorage.getItem("Presupuesto")) {        
        localStorage.setItem("Presupuesto", "[]");
      }
      setTimeout(function(){
      !productos.length
        ? dispatch(getProductos())
        : console.log("hecho");
      }, 3000);
    }, [dispatch]);


  return (
    <>
      <div class="container cont-card">
            <h2 className="title-card-home">
              Lista de productos
            </h2>

            <Paginado
                  productsPerPage= {productsPerPage}
                  allProducts={allProducts.length}
                  paginado={paginado}
                />


				<div class="padreDeCards">		
          {currentProducts.length>0  ? (
            currentProducts.map((e) => {
              return (
                <fragment>	
                    <ProductItem   id={e.id}
                    nombre={e.nombre}
                    preciodistribuidor={e.preciodistribuidor}
                    descdistribuidor= {e.descdistribuidor}
                    costocuellar={e.costocuellar}
                    totalconporcentaje={e.totalconporcentaje}
                    porcentaje={e.porcentaje} 
                    image={e.image} 

                    />

              </fragment>

              );
            })
          ) : (
            <div className="loader">
              {" "}
              <Loaderpag />{" "}
            </div>
          )}
        </div>
        <div class="btn-pack-home">
        </div>
      </div>
    </>
  );
}
