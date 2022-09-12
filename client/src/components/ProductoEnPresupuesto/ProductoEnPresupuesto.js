import React from "react";


export default function ProductoEnPresupuesto({ id, quantity, nombre, totalconporcentaje, image }) {


    return(
        <div>
        {true===true ? (
            <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded card-cart contenedor">
              <div class="mr-1">
                <img
                  class="rounded"
                  src={image}
                  width="220"
                  height="170"
                />
              </div>
                <div class="d-flex flex-column align-items-center product-details info-cart">
                  <h4 class="font-weight-bold"></h4>
                  <div class="d-flex flex-column align-items-start product-desc">
                    <div class="sizese mr-1">
                      <span class="text-grey"></span>{" "}
                      <span class="font-weight-bold">{nombre}</span>
                    </div>
    
                    <div class="colores">
                      <span class="text-grey b ">Código Producto:</span>{" "}
                      <span class="font-weight-bold b">
                             {id}
                      </span>
                    </div>
                  </div>
                </div>
              <div class="d-flex flex-row align-items-center qty">

                <h5 class="text-grey mt-1 mr-1 ml-1">Cantidad:{quantity}</h5>

              </div>
              <div>
                <h5 class="text-grey">{quantity} x ${totalconporcentaje} = ${quantity*totalconporcentaje}</h5>
              </div>
              <div class="d-flex align-items-center">

              </div>
            </div>
          ) : (
            <div className="loader">
              {" "}
            </div>
          )}
        </div>
    )
}