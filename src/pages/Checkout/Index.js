import "./Checkout.scss";
import { MdDelete } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { Delete_To_Cart } from "../../store/actions";


const Checkout = ({ quantity, setQuantity }) => {

    const CartItems = useSelector((state) => state.CartItems)
    const dispatch = useDispatch();

    const DeleteCartItem = (cartItem) => {
        dispatch(Delete_To_Cart(CartItems.filter((product) => product.id !== cartItem.id)))
        setQuantity(quantity.filter((item) => item.id !== cartItem.id))
    }

    const getTotalAmount = () => {
        return CartItems.reduce((prev, curr) => prev + curr.quantity*curr.price, 0)
    }

    const getDiscountAmount = () => {
        return CartItems.reduce((prev, curr) => prev + 5*(curr.quantity*curr.price)/100, 0)
    }

    return (
        <div className="checkout_container">
            <header className="checkout_header">My Cart</header>
            {
                quantity.length > 0 ? (
                    <>
                        <div className="checkout_card">
                            <div className="checkout_summary">
                                {
                                    CartItems?.map((product, index) => {
                                        return (
                                            <table className="table_cart">
                                                <tr>
                                                    <th></th>
                                                    <th>Name</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                    <th></th>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <img src={product.imageURL} alt={product.name} width={100} height={100} />
                                                    </td>
                                                    <td>
                                                        {product.name}
                                                    </td>
                                                    <td>
                                                        ₹{product.price}
                                                        X {product.quantity}
                                                    </td>
                                                    <td>
                                                        ₹{product.price * product.quantity}
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => DeleteCartItem(product)}
                                                            className="delete_btn"
                                                        >
                                                            <MdDelete size={30} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            </table>
                                        )
                                    })
                                }
                            </div>
                            <div className="amount_summary">
                                <header className="checkout_header">Total Amount</header>
                                <div className="table_cart">
                                    <section className="cart_rows">
                                        <div className="cart_col_1">Item Total(MRP)</div>
                                        <div className="cart_col_2">₹{getTotalAmount()}</div>
                                    </section>
                                    <div className="cart_line"></div>
                                    <section className="cart_rows">
                                        <div className="cart_col_1">Price Discount</div>
                                        <div className="cart_col_2">-₹{getDiscountAmount()}</div>
                                    </section>
                                    <div className="cart_line"></div>
                                    <section className="cart_rows">
                                        <div className="cart_col_1">Shipping Fee</div>
                                        <div className="cart_col_2">As per delivery address</div>
                                    </section>
                                    <div className="cart_line"></div>
                                    <section className="cart_rows_amount">
                                        <div className="cart_amount_1">To be paid</div>
                                        <div className="cart_amount_2">₹{getTotalAmount() - getDiscountAmount()}</div>
                                    </section>
                                </div>
                                <div className="btn_checkout">
                                    CHECKOUT
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="empty_items">
                        Please Add Items to the Cart
                    </div>
                )
            }
        </div>
    )
}

export default Checkout