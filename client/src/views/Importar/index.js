import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "./importar.css";
import { useDispatch } from "react-redux";
import * as XLSX from 'xlsx'; 
import { guardarProductos } from "../../redux/actions/guardarProductos";

import swal from 'sweetalert';



export default function Importar({ userlog }) {
  const dispatch = useDispatch();


  let preciodistribuidor= "PRECIO DISTRIBUIDOR"
  let costocuellar= "Costo CUELLAR"
  let totalconporcentaje="Total con porcentaje"
  let descdistribuidor= "Desc distribuidor"




  const [items, setItems] = useState([]);

  const readExcel=(file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)
  
      fileReader.onload=(e) => {
        const bufferArray = e.target.result;
  
        const wb=XLSX.read(bufferArray, {type:'buffer'});
      
        const wsname=wb.SheetNames[0];
        const ws=wb.Sheets[wsname];
        const data=XLSX.utils.sheet_to_json(ws);
         resolve(data);
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    }) 
    
      promise.then((d) => {
        setItems(d)       


      })
  }


  useEffect(() => {

    if (!localStorage.getItem("Presupuesto")) {        
      localStorage.setItem("Presupuesto", "[]");
    }
  }, [dispatch]);

  console.log(items)
  const guardar = () => {

   /*  console.log(object) */
/*     for(let i=0; i<items.length; i++) {
      let objetoProducto={}
      objetoProducto.id=items[i].codigoproducto
      objetoProducto.nombre=items[i].Nombre
      objetoProducto.preciodistribuidor=items[i][preciodistribuidor]
      objetoProducto.descdistribuidor=items[i][descdistribuidor]
      objetoProducto.costocuellar=items[i][costocuellar]
      objetoProducto.totalconporcentaje=items[i][totalconporcentaje]
      objetoProducto.porcentaje=items[i].PORCENTAJE
      objetoProducto.image=items[i].imagen
      dispatch(guardarProductos(objetoProducto));
    } */
  /*   console.log(JSON.stringify(object)); */
/*   let items2=[]
  let items3=[]
  let items4=[]
  let items5=[]
  let items6=[] */


  let arregloPaquetes=[]
var k=0
var l=Math.trunc(items.length/20)+1
for (let i=0; i<l; i++){
	let arregloPaquetes=[]
	if(i===Math.trunc(items.length/20)) {
		for (let j=k; j<items.length; j++){
			arregloPaquetes.push(items[j])
			k++
		}
	} else {
		for (let a=0; a<k; a++){
			arregloPaquetes.push(items[a])
			k++
		}
	}
  dispatch(guardarProductos(arregloPaquetes))
}

    swal({
      title: "Archivo cargado",
      icon: "success",
    })

    setTimeout(function(){
      window.location.reload()
  }, 2000);
  
  };

  const cancelar = () => {
    swal({
      title: "Cancelado",
      icon: "success",
    })
    setTimeout(function(){
      window.location.reload()
  }, 2000);
  }



  return (
    <>
      <Navbar userlog={userlog} />
      <div className="container-services">
        <div className="searchContainer">
        <input type="file"
	onChange={(e) => {
		const file = e.target.files[0];
		readExcel(file);
		}} />
    <button class="btnGuardarProductos" onClick={() => guardar()}>Guardar productos</button>
    <button class="btnGuardarProductos" onClick={() => cancelar()}>Cancelar</button>


        </div>

        <div className="cardConatinerServices">
          <div>
          </div>
               <div class="contenedorCabecerayProductos">
          <div class="cabecera">
              <div class="cabeceraCodigoProducto">Codigo producto</div>
              <div class="cabeceraNombre">Nombre</div>
              <div class="cabeceraPrecioDistribuidor">Precio Distribuidor</div>
              <div class="cabeceraDescuentoDistribuidor">Descuento ditribuidor</div>
              <div class="cabeceraCostoCuellar">costo CUELLAR</div>
              <div class="cabeceraTotalConPorcentaje">Total con porcentaje</div>
              <div class="cabeceraPorcentaje">Porcentaje</div>
              <div class="cabeceraEstado">Estado</div>
          </div>
          <div class="contenedorProductos">

          {items.map((producto) => (
              <div class="contenedorProductosInMap">
               {/*  {idTexto="texto"} */}
                <div class="productoCodigoProducto">{producto.codigoproducto}</div>
                <div class="productoNombre">{producto.Nombre}</div>
                <div class="productoPrecioDistribuidor">{producto[preciodistribuidor]}</div>
                <div class="productoDescuentoDistribuidor">{producto[descdistribuidor]}</div>
                <div class="productoCostoCuellar">{producto[costocuellar]}</div>
                <div class="productoTotalConPorcentaje">{producto[totalconporcentaje]}</div>
                <div class="productoPorcentaje">{producto.PORCENTAJE}</div>
                <div class="productoEstado">OK</div>
              </div>
          ))}

          </div>
      </div>
        </div>
      </div>

      <div className="fotservices">
        <Footer />
      </div>
    </>
  );
}
