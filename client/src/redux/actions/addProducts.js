import { ADD_PRODUCT } from "./actionTypes";


export const addProducts = (objetoCantidad) => {

    console.log("arrayIdCantidad",objetoCantidad)
  return async function (dispatch) {
/*     try { */
      
        return dispatch({
          type: ADD_PRODUCT,
          payload: objetoCantidad
        });
/*       } catch (err) {
        console.log(err);
      } */
    };
};

