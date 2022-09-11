import Products from '../../Components/Products';
import Sidebar from '../../Components/Sidebar';
import "./index.styles.scss";

const HomePage = ({tShirts, setTShirts, showPopup, setShowPopup, quantity ,setQuantity }) => {
    
    return (
        <>
            
            <div className="container">
                <div className="sidebar">
                    <Sidebar
                        setTShirts={setTShirts}
                        setShowPopup={setShowPopup}
                    />
                </div>
                {
                    showPopup ?
                        <Sidebar
                            setTShirts={setTShirts}
                            setShowPopup={setShowPopup}
                        /> :
                        <div className="products">
                            <Products
                                tShirts={tShirts}
                                setTShirts={setTShirts}
                                setQuantity={setQuantity}
                                quantity={quantity}
                                setShowPopup={setShowPopup}
                            />
                        </div>
                }
            </div>
        </>
    )
}

export default HomePage