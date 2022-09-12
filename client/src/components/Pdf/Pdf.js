import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../Footer/index";
import "./Pdf.css";
import { jsPDF } from "jspdf";
import ProductoEnPresupuesto from "../ProductoEnPresupuesto/ProductoEnPresupuesto"
import { getAuth } from "firebase/auth";
import Navbar from "../Navbar";



export default function Pdf({ userlog }) {
  const [presupuesto, setPresupuesto] = useState(false);
  const dispatch = useDispatch();
  var total=0


  const arrayAllProductos = useSelector ((state) => state.rootReducer.allProductos)

  const auth = getAuth();
  const user = auth.currentUser;


  useEffect(() => {
    if (!localStorage.getItem("Presupuesto")) {        
      localStorage.setItem("Presupuesto", "[]");
    }

  }, [dispatch]);


  let arrayLocalStorage = JSON.parse(localStorage.getItem("Presupuesto"))
  let arrayProductosEnPresupuesto=[]

let order=[]
for (let i=0; i<arrayAllProductos.length; i++) {
  for(let j=0; j<arrayLocalStorage.length; j++) {
    console.log("entro al doble for")
    if(arrayAllProductos[i].id==arrayLocalStorage[j].id) {

      arrayProductosEnPresupuesto=[...arrayProductosEnPresupuesto,
      {id:arrayLocalStorage[j].id, nombre:arrayAllProductos[i].nombre, 
      totalconporcentaje:arrayAllProductos[i].totalconporcentaje, quantity:arrayLocalStorage[j].quantity,image:arrayAllProductos[i].image }]
      total=total+arrayLocalStorage[j].quantity*arrayAllProductos[i].totalconporcentaje
      order.push(j+1)
    }
  }

}


const pages=(Math.trunc(arrayProductosEnPresupuesto?.length/10) + 1)

//las lineas de arriba son para defiinir la cantidad de páginas


const[pagoEfectivo, setPagoEfectivo] = useState({
  descuento:20,
  totalEfectivo:total*(100-20)/100,
  cliente:"Consumidor Final"
})

function handleChange(e) {
  setPagoEfectivo({
      ...pagoEfectivo,
      [e.target.name] : e.target.value,
      totalEfectivo:total*(100-e.target.value)/100

  })
}

function handleChangeCliente(e) {
  setPagoEfectivo({
      ...pagoEfectivo,
      [e.target.name] : e.target.value,

  })
}

const handleDownload = () => {
	const doc = new jsPDF("p", "px", "a4")
//////////////////////fecha
      var date = new Date();
    const formatDate = (date)=>{
    let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    return formatted_date;
    }
//////////////////////fecha
	
	for(let j=0; j<pages; j++){
		if (j!=0) doc.addPage()
		
/* 		doc.addImage("/storage-naranja.png", 1800,15,100,50) */
    doc.text("CUELLAR PERFORACIONES" , 40, 30).setFontSize(10); 
    doc.text("Fecha:" + " " + formatDate(date) ,350, 30).setFontSize(10); 
    doc.text(`Cliente: ` + `${pagoEfectivo.cliente}`  ,40, 50).setFontSize(10); 
    doc.text("Presupuesto" ,40, 80).setFontSize(10); 
    doc.line(40,82,83,82,"f")
    doc.text("Cantidad x Descripción" ,40, 95).setFontSize(10); 
    doc.line(40,100,551,100,"f")
    doc.text("Valor unitario" ,300, 95).setFontSize(10); 
    doc.text("Valor total" ,380, 95).setFontSize(10); 


		if(j<=(pages-1)) {
			for (let i=(9*j); i<(order.length<((j+1)*10) ? order.length : ((j+1)*10)-1) ; i++) {
/* 				doc.addImage(order[i].featuredAsset == null ? `/imagenDef.png` : order[i].featuredAsset.name, 20,90+(i-(j*9))*50, 4) */ ///aca se cortó la pantalla!!
				doc.setFontSize(13)
        doc.text(`${arrayProductosEnPresupuesto[i].quantity}`+ ` x ` + `${arrayProductosEnPresupuesto[i].nombre}` , 40, 120+(i-(j*9))*50).setFontSize(20);
				doc.setFontSize(13)
				doc.setFontSize(14)
        doc.text(`$`+` `+`${arrayProductosEnPresupuesto[i].totalconporcentaje}`, 300, 120+(i-(j*9))*50)
        doc.text(`$`+` `+`${arrayProductosEnPresupuesto[i].quantity*arrayProductosEnPresupuesto[i].totalconporcentaje}`, 380, 120+(i-(j*9))*50)
			}
		}

		if(j==(pages-1)){
			doc.text(`Total:`, 45,565)
      doc.text(`Pago en efectivo:`, 45,595)
			doc.line(40,550,551,551,"f")
			doc.setFontSize(14)
/* 			doc.text(`$${toThousand(data.activeOrder.total)}`, 330, 565) */
      doc.text(`$`+` ` + `${total}`, 380, 565)
      doc.text(`$`+` ` + `${pagoEfectivo.totalEfectivo}`, 380, 595)
		}
	}

  let nombrePresupuesto=`${pagoEfectivo.cliente}` + `-Presupuesto.pdf`
	doc.save(nombrePresupuesto);
}

const limpiarPresupuesto = () => {
  localStorage.setItem("Presupuesto", "[]");
  setPagoEfectivo({
    ...pagoEfectivo,
    totalEfectivo:0  
  })


  if(presupuesto) {
    setPresupuesto(false)
  } else {
    setPresupuesto(true)
  }
}




  return (
    <div>
      <Navbar userlog={userlog} />
      <div class="container mt-5 mb-5">
        <div class="d-flex justify-content-center row">
          <div class="col-md-12">
            <div class="p-2">
              <h4>Presupuesto</h4>
              <div class="d-flex flex-row align-items-center pull-right">
                {" "}
                <button className="btn btn-danger btn-lg" onClick={limpiarPresupuesto}>
                  Limpiar presupuesto
                </button>
              </div>
            </div>
            <div>
              {arrayProductosEnPresupuesto.map((Cart) => (
                <ProductoEnPresupuesto
                  id={Cart.id}
                  quantity={Cart.quantity}
                  nombre={Cart.nombre}
                  totalconporcentaje={Cart.totalconporcentaje}
                  image={Cart.image}
                />
              ))}
              <hr></hr>
              <div class="d-flex flex-row align-items-start mt-3 p-2 bg-white rounded cc">
                <h5>Total ${total}</h5>
              </div>


              <div class="d-flex flex-row align-items-start mt-3 p-2 bg-white rounded cc">
                <h5>Pago en efectivo ${pagoEfectivo.totalEfectivo}</h5>
              </div>
              <div class="d-flex flex-row align-items-start mt-3 p-2 bg-white rounded cc">

              <div class="d-flex flex-row align-items-start mt-3 p-2 bg-white rounded cc">
                <h5>Cliente:</h5>
                <input                              
                              type="text"	
                              value={pagoEfectivo.cliente}    	
                              name="cliente"
                              onChange={(e) => handleChangeCliente(e)}
                            />
              </div>
              <div class="d-flex flex-row align-items-start mt-3 p-2 bg-white rounded cc">
                <h5>Aplicar descuento en efectivo: </h5>
                            <input                              
                              type="number"	
                              value={pagoEfectivo.descuento}    	
                              name="descuento"
                              onChange={(e) => handleChange(e)}
                            />
                           <h5>%</h5> 
                           </div>
              </div>                            
            </div>

            <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded cc">
                <button
                  type="button"
                  className="btn btn-warning btn-block btn-lg ml-2 pay-button bb"
                  onClick={() =>
                    handleDownload()
                  }
                >
                    Descargar Archivo PDF
                </button>

            </div>

          </div>
        </div>
      </div>
      <div className="div-cart">
        <Footer />
      </div>
    </div>
  );
}
