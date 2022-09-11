import './App.css';
import HomePage from './pages/HomePage';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './pages/Checkout/Index';
import Header from './Components/Header';
import { getAllProducts } from './store/actions';


function App() {
  const dispatch = useDispatch()
  const [tShirts, setTShirts] = useState([])
  const [showPopup, setShowPopup] = useState(false)
  useEffect(() => {
    axios.get("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json")
      .then((res) => {
        dispatch(getAllProducts(res.data))
        setTShirts(res.data)
      })
  }, [])
  const [quantity, setQuantity] = useState([])

  return (
    <BrowserRouter>
      <header className="header">
        <Header quantity={quantity}/>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <HomePage
                tShirts={tShirts}
                setTShirts={setTShirts}
                showPopup={showPopup}
                setShowPopup={setShowPopup}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>} />
        <Route path="/checkout"
          element={
            <Checkout
              quantity={quantity}
              setQuantity={setQuantity}
            />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
