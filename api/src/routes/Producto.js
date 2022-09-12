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
	let {
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
	res.send('Productos creados o actualizados')
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