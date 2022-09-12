    const { Router } = require('express');
    const router = Router();
    const axios = require('axios')
    const {Producto, Presupuesto} = require('../db')
    const {Op} = require('sequelize')


    router.post('/', async (req,res) => {
        try {
        res.send("post presupuesto")
        let {
            cantidad,
            correo,
            precioactual,
            descuento,
            clienteIdCliente,
        }= req.body	
        const newReview = await Presupuesto.findOrCreate({
            where: {
              cantidad: cantidad,
              correo: correo,
              precioactual: precioactual,
              descuento: descuento,
              clienteIdCliente:clienteIdCliente
            },
          });

        } catch {
            res.status(500).json({message: error.message})
        }
    })


    module.exports = router;