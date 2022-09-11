import React, { useState } from 'react';
import { MdCancel } from "react-icons/md";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useSelector, useDispatch } from 'react-redux';
import "./Sidebar.scss";

const Sidebar = ({ setTShirts, setShowPopup }) => {
    const {products} = useSelector((state) => state)
    const [FilteredProducts, setFilteredProducts] = useState([
        { category: 'color', items: [] },
        { category: 'price', items: [] },
        { category: 'type', items: [] },
        { category: 'gender', items: [] }
    ])
    const [value, setValue] = React.useState([0, 500]);
    const colors_list = [...new Set(products?.map((item) => item.color))];
    const type_list = [...new Set(products?.map((item) => item.type))];
    const gender_list = ["Men", "Women"];

    const onChange = (e, newValue) => {
        if(newValue) setValue(newValue);
        const ProductIndex = FilteredProducts.findIndex(x => x.category === e.target.name)
        const ProductItems = ProductIndex !== -1 && FilteredProducts[ProductIndex].items
        if(ProductItems) {
            if (ProductItems.includes(e.target.value)) {
                ProductItems.splice(ProductItems.findIndex(x => x === e.target.value), 1)
            } else {
                ProductItems.push(e.target.value)
            }
        }
        setFilteredProducts(FilteredProducts)

        let filteredShirts = products

        if (FilteredProducts[0].items.length > 0 && colors_list.filter((el) => FilteredProducts[0].items?.includes(el))) {
            filteredShirts = (filteredShirts.filter((item) => FilteredProducts[0].items.includes(item.color)))
        }
        
        if (FilteredProducts[2].items.length > 0 && type_list.filter((el) => FilteredProducts[2].items?.includes(el))) {
            filteredShirts = (filteredShirts.filter((item) => FilteredProducts[2].items.includes(item.type)))
        }
        if (FilteredProducts[3].items.length > 0 && gender_list.filter((el) => FilteredProducts[3].items?.includes(el))) {
            filteredShirts = (filteredShirts.filter((item) => FilteredProducts[3].items.includes(item.gender)))
        }
        filteredShirts = (filteredShirts.filter((item) => value[0] <= item.price && item.price <= value[1]))

        setTShirts(filteredShirts)
    }

    return (
        <>
            <div className="card_sidebar">
                <button className="cancel_button" onClick={() => setShowPopup((prevState) => !prevState)}><MdCancel size={30} /></button>
                <div className="checkboxes_filter">
                    <header>Color</header>
                    <div className="checkboxes_list">
                        {
                            colors_list?.map((color) => {
                                return (
                                    <div className="checkboxes_field">
                                        <input type="checkbox" name="color" value={color} onChange={onChange} /> {color}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="checkboxes_filter">
                    <header>Gender</header>
                    <div className="checkboxes_list">
                        {
                            gender_list?.map((gender) => {
                                return (
                                    <div className="checkboxes_field">
                                        <input type="checkbox" name="gender" value={gender} onChange={onChange} /> {gender}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="checkboxes_filter">
                    <header style={{marginBottom: 40}}>Price</header>
                    <Box sx={{ width: 100 }}>
                        <Slider
                            max={500}
                            min={0}
                            value={value}
                            onChange={onChange}
                            valueLabelDisplay="on"
                        />
                    </Box>
                </div>
                <div className="checkboxes_filter">
                    <header>Type</header>
                    <div className="checkboxes_list">
                        {
                            type_list?.map((type) => {
                                return (
                                    <div className="checkboxes_field">
                                        <input type="checkbox" name="type" value={type} onChange={onChange} /> {type}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <footer className="footer">
                    <button onClick={() => setShowPopup((prevState) => !prevState)}>CLOSE</button>
                    <button onClick={() => setShowPopup((prevState) => !prevState)}>APPLY</button>
                </footer>
            </div>
        </>
    )
}

export default Sidebar;