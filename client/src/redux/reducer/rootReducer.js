import {
  DELETE_PRODUCT,
  ADD_PRODUCT,
  GET_PRODUCTOS,
  SEARCH_PRODUCTOS
} from "../actions/actionTypes";


const initialState = {
    productosEnPresupuesto:[],
    productos:[],
    allProductos:[],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case SEARCH_PRODUCTOS:			
    return {
      ...state,
      productos: action.payload
    }
    case GET_PRODUCTOS: 
    console.log(action.payload);
    return{
      ...state,
      allProductos: action.payload,
      productos: action.payload,
    }
    case ADD_PRODUCT: {
        console.log(action.payload)
        let arrayLocalStorage=JSON.parse(localStorage.getItem("Presupuesto"));
        let newItem = arrayLocalStorage.find(
          (item) => item.id == action.payload.id
        );        
        if(newItem) {
          console.log("el item ya está en el carrito")
          let arrayProductoEnPresupuesto = arrayLocalStorage.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: action.payload.quantity}
            : item )

        localStorage.setItem("Presupuesto", JSON.stringify(arrayProductoEnPresupuesto));  

        } else {
          console.log("el item no está en el carrito")
          arrayLocalStorage=[...arrayLocalStorage, {id:action.payload.id, quantity:action.payload.quantity}]
          localStorage.setItem("Presupuesto", JSON.stringify(arrayLocalStorage));
        }
    }    
      return {
      ...state,
      productosEnPresupuesto: [],
    };

    case DELETE_PRODUCT: {
        console.log(action.payload)
        let arrayProducts = JSON.parse(localStorage.getItem("Presupuesto"))
        console.log(arrayProducts)
        let arrayProductsFiltered = arrayProducts.filter(
          (item) => item.id !== action.payload )
        localStorage.setItem("Presupuesto", JSON.stringify(arrayProductsFiltered));


    }       return {
      ...state,
      productosEnPresupuesto: [],
    };
    default: 
      return state
  }
}



