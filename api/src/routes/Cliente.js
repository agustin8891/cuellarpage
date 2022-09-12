const { Router } = require('express');
const router = Router();
const axios = require('axios')
const {Producto, Cliente, Presupuesto} = require('../db')
const {Op} = require('sequelize')



const getAllClientes = async() => {
	let r=await Cliente.findAll();
		r=r.map((e) => ({...e.dataValues}));
    console.log(r)
	return r;
	};



router.get('/', async (req,res) => {
	let nombreyapellido= req.query.nombreyapellido
	console.log(nombreyapellido)
  let clienteBd
	console.log("get")
	if(nombreyapellido) {
				try {
						clienteBd = await Cliente.findAll({
								where: {
									nombreyapellido: {
										[Op.iLike]: "%" + nombreyapellido + "%"
									}
							},
							order: [
								['nombreyapellido', 'ASC'],
							], 
							})
                            console.log("esto es antes del print")

					clienteBd=clienteBd.map((e) => ({...e.dataValues}));
                         console.log(clienteBd)
					 					if(clienteBd.length>0) {
											res.status(200).send(clienteBd) 		
										} else {
											res.status(404).send("Error")	
										}
						}
						catch(err) {
							res.status(404).send(err)
						} 
					} 
					else {
			let clientesAll= await getAllClientes();
			res.status(200).send(clientesAll)        
		}
	})


router.get('/:idCliente', async (req,res) => {
		 try {	
			const idCliente = req.params.idCliente;
			let buscarClienteId = await Cliente.findAll({
				include: Presupuesto,
				where: { idCliente: idCliente },
				order: [
					['nombreyapellido', 'ASC'],
				], 
				})
				res.send(buscarClienteId)				
		} catch(error) {
					res.status(404).json({message: error.message})
		}	
})





router.post('/', async (req,res) => {
	try {
		let {
			nombreyapellido,
			correo,
			telefonofijo,
			celular,
		}= req.body	
		console.log(req.body)

      let clienteCreado = await Cliente.create({
        nombreyapellido,
        correo,
        telefonofijo,
        celular,
	}) 
		res.send('Cliente Creado con éxito')
	}	catch(error){
		res.status(500).json({message: error.message})
	}
})




router.put('/:idCliente', async (req,res) => {
	try{
	const idCliente = req.params.idCliente;
	console.log(idCliente)
	let {
        nombreyapellido,
        correo,
        telefonofijo,
        celular,
	}= req.body	

	let clienteBuscado = await Cliente.findByPk(idCliente);
    if (clienteBuscado) {
	  clienteBuscado.nombreyapellido=nombreyapellido
	  clienteBuscado.correo=correo,
	  clienteBuscado.telefonofijo=telefonofijo,
	  clienteBuscado.celular=celular
	  if(clienteBuscado) {await clienteBuscado.save()}
	  res.send(clienteBuscado)
	} else {
		res.send("cliente no encontrado")
	}
	}catch{
		res.status(500).json({message: error.message})
	}
})




module.exports = router;