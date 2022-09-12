import { DELETE_ALLPRODUCTS } from "./actionTypes";
import axios from 'axios'


export const deleteAllProducts = (id) => {
    console.log("id", id)
    return async function(dispatch) {
        try {
            let result = await axios.delete(`/producto?id=`+ id);
            return dispatch({
                type: DELETE_ALLPRODUCTS,
            })

        } catch (err) {
            console.log(err)
        }
    };
};

/* export const getProductos = () => {
    return async function(dispatch) {
        try {
            let result = await axios.get(`http://localhost:3001/producto`);
            console.log(result.data)
            return dispatch({
                type: "GET_PRODUCTOS",
                payload: result.data
            })

        } catch (err) {
            console.log(err)
        }
    };
}; */