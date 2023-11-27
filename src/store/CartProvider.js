import React, { useState, useEffect } from "react";
import CartContext from "./CartContext";


const CartProvider = (props) => {
    const [candyArray, setCandyArray] = useState([]);
    const [cartArray, setCartArray] = useState([]);
    const [finalPrice,setFinalPrice]=useState(0);

    const addItemHandler = (item) => {

        setCandyArray((prev) => {
            return [...prev, item]
        })
    };

    const addToCartHandler = async () => {
        const response = await fetch('https://crudcrud.com/api/168519e7063a4d4ebf976bb76c9ad4a0/cart');
        if (!response.ok) {
            alert("Something went wrong");
        }
        const data=await response.json();
        setCartArray(data);



    }


    useEffect(() => {
        fetch('https://crudcrud.com/api/168519e7063a4d4ebf976bb76c9ad4a0/products')
            .then(async (response) => {
                if (response.ok) {
                    console.log(response.status);
                    const data = await response.json();
                    setCandyArray(data);
                }
                else {
                    alert("something went wrong")
                }
            })
    }, []);

    useEffect(() => {
        fetch('https://crudcrud.com/api/168519e7063a4d4ebf976bb76c9ad4a0/cart')
            .then(async (response) => {
                if (response.ok) {
                    console.log(response.status);
                    const data_2 = await response.json();
                    setCartArray(data_2);
                }
                else {
                    alert("something went wrong")
                }
            })
    }, [])


    const cartContext = {
        menuItems: candyArray,
        addItem: addItemHandler,
        cartItem: cartArray,
        addToCart: addToCartHandler,
        total:finalPrice,


    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
};



export default CartProvider;