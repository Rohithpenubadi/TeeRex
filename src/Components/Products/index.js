import React, { useEffect, useState } from 'react'
import "./Products.scss";
import { FaSearch } from "react-icons/fa"
import { RiFilterFill } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import StoreItems from "../utils/StoreItems.js";
import { Add_To_Cart, Remove_From_Cart } from '../../store/actions';

const Products = ({ tShirts, firstProducts, setTShirts, setQuantity, quantity, setShowPopup }) => {
  
  const {products} = useSelector((state) => state)

  const [searchItems, setSearchItems] = useState("");
  const CartItems = useSelector((state) => state.CartItems)
  const dispatch = useDispatch();
  const onChange = (e) => {
    setSearchItems(e.target.value)
  }

  const ProductsList = () => {
    const newProducts = products.filter((item) =>
      item.name.toLowerCase().includes(searchItems.toLowerCase().trim()) ||
      item.type.toLowerCase().includes(searchItems.toLowerCase().trim()) ||
      item.color.toLowerCase().includes(searchItems.toLowerCase().trim())
    )
    setTShirts(newProducts)
  }

  const AddToCart = (cartItem) => {
    setTShirts(currentItems => {
      if (currentItems.find((item) => item.id === cartItem.id) == null) {
        return [...currentItems, { id: cartItem.id, quantity: 1 }]
      } else {
        return currentItems.map((item) => {
          if (item.id === cartItem.id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
    setQuantity(currentItems => {
      if (currentItems.find((item) => item.id === cartItem.id) == null) {
        return [...currentItems, { id: cartItem.id, quantity: 1 }]
      } else {
        return currentItems.map((item) => {
          if (item.id === cartItem.id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
    if (CartItems?.find((item) => item.id === cartItem.id) == null) {
      return dispatch(Add_To_Cart([...CartItems, { ...cartItem, quantity: 1 }]))
    } else {
      dispatch(Add_To_Cart(
        CartItems?.map((cart) => cart.id === cartItem.id ? { ...cart, quantity: cart.quantity + 1 } :
          { ...cart, quantity: cart.quantity })))
    }

  }
  const RemovefromCart = (cartItem) => {
    setTShirts(currentItems => {
      if (currentItems.find((item) => item.id === cartItem.id) == null) {
        return [...currentItems, { id: cartItem.id, quantity: 1 }]
      } else {
        return currentItems.map((item) => {
          if (item.id === cartItem.id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
    setQuantity(currentItems => {
      if (currentItems.find((item) => item.id === cartItem.id) == null) {
        return [...currentItems, { id: cartItem.id, quantity: 1 }]
      } else {
        return currentItems.map((item) => {
          if (item.id === cartItem.id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })

    CartItems?.map((product) => {
      if (product.id === cartItem.id) {
        if (product.quantity === 1) return dispatch(Remove_From_Cart(CartItems.filter((product) => product.id !== cartItem.id)))
        else {
          return (
            dispatch(
              Remove_From_Cart(
                CartItems.map((item) => {
                  if (item.id === cartItem.id) return { ...item, quantity: item.quantity - 1 }
                  else return item
                })
              )
            ))
        }
      }
    })
  }

  return (
    <>
      <div className="product_search">
        <input
          className="search_input"
          placeholder="Search for Products..."
          onChange={onChange}
          value={searchItems}
        />
        &nbsp;&nbsp;
        <button onClick={() => ProductsList()}><FaSearch size={25} /></button>
        <button className="product_filter" onClick={() => setShowPopup((prevState) => !prevState)}><RiFilterFill size={28} /></button>
      </div>
      <div className="products_list">
        {
          tShirts?.map((item, index) =>
          (
            <div className="product_container" >
              <StoreItems
                key={item.id}
                item={item}
                quantity={quantity}
                AddToCart={AddToCart}
                RemovefromCart={RemovefromCart}
              />
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Products


// * (item.id === quantity.id && quantity.amount !== 0 ? quantity.amount : 1)
