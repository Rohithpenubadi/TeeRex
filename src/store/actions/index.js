export const getAllProducts = (val) => {
    return { type: "GET_ALL_PRODUCTS", payload: val}
}

export const searchProducts = (val) => {
    return { type: "SEARCH_PRODUCTS", payload:val }
}

export const Add_To_Cart = (val) => {
    return { type: "ADD_TO_CART", payload: val}
}

export const Remove_From_Cart = (val) => {
    return { type: "REMOVE_FROM_CART", payload: val}
}

export const Delete_To_Cart = (val) => {
    return { type: "DELETE_TO_CART", payload: val}
}