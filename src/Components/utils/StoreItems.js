
const StoreItems = ({ item, quantity, AddToCart, RemovefromCart }) => {
    const getAmount = quantity?.find(product => product.id=== item.id)
    return (
        <>
            <div>{item.name}</div>
            <img src={item.imageURL} alt={item.name} width={250} height={250} />
            <div className="product_price">
                <div className="price_tag">Rs {item.price}</div>
                <div className="product_cart" id={item.id}>
                    {
                        getAmount?.quantity > 0  ?
                            item.quantity < 1 ?
                            <button
                                disabled={item.quantity === 0 ? true : false}
                                title={item.quantity === 0 && "Out of Stock"}
                                onClick={() => AddToCart(item.id)}
                                className={item.quantity === 0 ? "empty_cart" : "product_cart"}
                            >
                                Out of Stock
                            </button>
                            :  
                            <div className="add_quantity">
                                <button onClick={() => { RemovefromCart(item) }} className="add_cart">-</button>
                                {getAmount?.quantity}
                                <button onClick={() => AddToCart(item)} className="add_cart">+</button>
                            </div>
                            :
                            <button
                                disabled={item.quantity === 0 ? true : false}
                                title={item.quantity === 0 && "Out of Stock"}
                                onClick={() => AddToCart(item)}
                                className={item.quantity === 0 ? "empty_cart" : "product_cart"}
                            >
                                Add to Cart
                            </button>
                    }
                </div>

            </div>
        </>
    )
}

export default StoreItems;