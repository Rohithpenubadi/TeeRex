import { AddToCart, DeductToCart, DeleteToCart } from "../actions";

const initialState = {
    products: [],
    searchProducts: [],
    CartItems: []
}


const counterReducer = (state = initialState, action) => {
    const newState = { ...state }
    switch (action.type) {
        case "GET_ALL_PRODUCTS":
            newState.products = action.payload;
            break;
        case "SEARCH_PRODUCTS":
            newState.products = action.payload;
            break;
        case "ADD_TO_CART":
            newState.CartItems = action.payload;
            break;
        case "REMOVE_FROM_CART":
            newState.CartItems = action.payload;
            console.log("Rohith")
            break;
        case "DELETE_TO_CART":
            newState.CartItems = action.payload;
            break;
        default:
    }

    return newState;

}

export default counterReducer