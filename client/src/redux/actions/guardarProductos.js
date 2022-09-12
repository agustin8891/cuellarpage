import { SAVE_PRODUCTOS } from './actionTypes'
import axios from 'axios'

export const guardarProductos = (objetoProducto) => {
    console.log(objetoProducto)
    return async function(dispatch) {
        try {
            let result = await axios.post(`/producto`, objetoProducto);
            console.log(result.data)
            return dispatch({
                type: "SAVE_PRODUCTOS",
                payload: result.data
            })

        } catch (err) {
            console.log(err)
        }
    };
};


