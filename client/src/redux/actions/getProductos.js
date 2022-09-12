import { GET_PRODUCTOS } from './actionTypes'
import axios from 'axios'

export const getProductos = () => {
    return async function(dispatch) {
        try {
            let result = await axios.get(`/producto`);
            console.log(result.data)
            return dispatch({
                type: "GET_PRODUCTOS",
                payload: result.data
            })

        } catch (err) {
            console.log(err)
        }
    };
};