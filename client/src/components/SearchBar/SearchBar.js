import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNameProducts } from "../../redux/actions/getNameProducts";
import styles from './SearchBar.module.css'


export default function SearchBar() {
	const dispatch = useDispatch()
	const[name,setName] = useState("")
	const navigate = useNavigate()
	
function handleInputChange(e) {
	e.preventDefault()
	setName(e.target.value)
	console.log(name)
}

function handleSubmit(e) {
	e.preventDefault()
	dispatch(getNameProducts(name))
	navigate('/')

	
}

return (
	<div >
		<label className={styles.labelBuscarProductos}>Buscar Productos:</label>
		<div>
			<input type='text' placeholder="Buscar Producto..."
			onChange = {(e) => handleInputChange(e)}
			className={styles.buscarClase}/>
		</div>
		<div>
			<button type='submit' onClick={(e) => handleSubmit(e)} 
			className={styles.botonBuscar}>Buscar</button>
		</div>
	</div>
)


}