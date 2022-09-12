import { SEARCH_PRODUCTOS} from './actionTypes'
import axios from 'axios'



export function getNameProducts(name) {
	return async function (dispatch) {
		try{
			var json=await axios.get("/producto?nombre=" + name)
			return dispatch ({
				type: SEARCH_PRODUCTOS,
				payload: json.data
				
			})
		} catch(error) {
			alert("No se encontró ningún producto")
		}
	}	
}	