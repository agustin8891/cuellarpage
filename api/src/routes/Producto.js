const { Router } = require('express');
const router = Router();
const axios = require('axios')
const {Producto} = require('../db')
const {Op} = require('sequelize')





const getAllProductos = async() => {
	let r=await Producto.findAll();

		r=r.map((e) => ({...e.dataValues}));

    console.log(r)
	return r;
	};


router.get('/', async (req,res) => {
	let nombre= req.query.nombre
	console.log(nombre)
  let recipe
	let arrayProductos=[]
  let productoBd
	console.log("get")
	if(nombre) {
				try {
						productoBd = await Producto.findAll({
								where: {
									nombre: {
										[Op.iLike]: "%" + nombre + "%"
									}
							},
							order: [
								['nombre', 'ASC'],
							], 
							})


					productoBd=productoBd.map((e) => ({...e.dataValues}));
          console.log(productoBd)
					 					if(productoBd.length>0) {
											res.status(200).send(productoBd) 		
										} else {
											res.status(404).send("Error")	
										}
						}
						catch(err) {
							res.status(404).send(err)
						} 
					} 
					else {
			let productsAll= await getAllProductos();
			res.status(200).send(productsAll)        
		}
	})





router.post('/', async (req,res) => {

// de aca para abajo

	let arrayProductos=req.body
	for(let i=0; i<arrayProductos.length; i++) {
		let productoBuscado = await Producto.findByPk(arrayProductos[i].id);
		let id=arrayProductos[i].codigoproducto
		let nombre=arrayProductos[i].Nombre
		let preciodistribuidor=arrayProductos[i]['PRECIO DISTRIBUIDOR']
		let descdistribuidor=arrayProductos[i]['Desc distribuidor']
		let costocuellar=arrayProductos[i]['Costo CUELLAR']
		let totalconporcentaje=arrayProductos[i]['Total con porcentaje']
		let porcentaje=arrayProductos[0].PORCENTAJE
		let image=arrayProductos[i].imagen

		if (productoBuscado === null) {	
		  let productoCreado = await Producto.create({
			id,
			nombre,
			preciodistribuidor,
			descdistribuidor,
			costocuellar,
			totalconporcentaje,
			porcentaje,
			image
		}) 
		} else {
		  productoBuscado.nombre=arrayProductos[i].nombre
		  productoBuscado.preciodistribuidor=arrayProductos[i].preciodistribuidor,
		  productoBuscado.descdistribuidor=arrayProductos[i].descdistribuidor,
		  productoBuscado.costocuellar=arrayProductos[i].costocuellar,
		  productoBuscado.totalconporcentaje=arrayProductos[i].totalconporcentaje,
		  productoBuscado.porcentaje=arrayProductos[i].porcentaje,
		  productoBuscado.image=arrayProductos[i].image
	
				if(productoBuscado) await productoBuscado.save()
			}  

	
	}

	
///de aca para arriba



/* 	let {
        id,
        nombre,
        preciodistribuidor,
        descdistribuidor,
        costocuellar,
        totalconporcentaje,
        porcentaje,
		image
	}= req.body	
    console.log(req.body)
    let productoBuscado = await Producto.findByPk(id);
    if (productoBuscado === null) {


      let productoCreado = await Producto.create({
        id,
        nombre,
        preciodistribuidor,
        descdistribuidor,
        costocuellar,
        totalconporcentaje,
        porcentaje,
		image
	}) 
    } else {
      productoBuscado.nombre=nombre
      productoBuscado.preciodistribuidor=preciodistribuidor,
      productoBuscado.descdistribuidor=descdistribuidor,
      productoBuscado.costocuellar=costocuellar,
      productoBuscado.totalconporcentaje=totalconporcentaje,
      productoBuscado.porcentaje=porcentaje,
	  productoBuscado.image=image

			if(productoBuscado) await productoBuscado.save()
		}  
	res.send('Productos creados o actualizados') */

		res.send("post")
})

router.delete('/', async (req,res) => {
/* 	try{ */
	
let id= req.query.id

	await Producto.destroy({
		where: {
		  id: id
		}
	  });
	  console.log(id)
	  res.send("borrado")
/* 	} catch(error){
		res.status(500).json({message: error.message})
	} */

})





module.exports = router;