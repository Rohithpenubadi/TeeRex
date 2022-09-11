import React, { useState } from 'react'
import "./Header.scss";
import { MdOutlineShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom';

const getTotalCartItems = (productItems) => {
  if (productItems) {
    return productItems.reduce((prev, curr) => prev + curr.quantity, 0)
  }
}

const Header = ({ quantity }) => {
  const [showUnderline, setShowUnderline] = useState(false);
  return (
    <div className="header_text">
      <div className="section1">TeeRex</div>
      <div className="section2">
        <div className="section_products">
          <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
            <button type="button" className={!showUnderline ? "button_link" : "no_link"} onClick={() => setShowUnderline(!showUnderline)}>
              Products
            </button>
          </Link>
        </div>
        <div className="cart_icon">
          <Link to="/checkout" style={{ textDecoration: 'none', color: "black" }}>
            <button type="button" className={showUnderline ? "button_link" : "no_link"} onClick={() => setShowUnderline(!showUnderline)}>
              <MdOutlineShoppingCart size={30} />
            </button>
          </Link>
        </div>
        <span className="quantity_amount">{getTotalCartItems(quantity)}</span>
      </div>
    </div>
  )
}

export default Header