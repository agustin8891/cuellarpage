import { DELETE_PRODUCT } from "./actionTypes";


export const deleteProduct = (id) => {

    console.log("arrayIdCantidad",id)
  return async function (dispatch) {
/*     try { */
      
        return dispatch({
          type: DELETE_PRODUCT,
          payload: id
        });
/*       } catch (err) {
        console.log(err);
      } */
    };
};