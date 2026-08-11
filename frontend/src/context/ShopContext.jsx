

import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/frontend_assets/assets";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();


const ShopContextProvider = (props) => {
    const currency = '$'
    const deliver_fees = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(true)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])

    //login
    const [token, setToken] = useState(
        localStorage.getItem('token') || ''
    )
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        // console.log("Add to Cart clicked");
        // console.log("Product ID:", itemId);
        // console.log("Size:", size);
        if (!size) {
            toast.error('Select the size ')
            return;
        }
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData)
        if (!token) {
            navigate("/login");
            toast.error("Please login to add items to cart.");
            return;
        }
        if (token) {
            // console.log("Token:", token);
            // console.log("Sending request...");
            try {
             const response=   await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token: token || localStorage.getItem('token') } })
                 if (response.data.success) {
            setCartItems(cartData);
            toast.success("Product added to cart!");
        } else {
            toast.error(response.data.message);
        }
            }
            catch (error) {
                // console.log(error.response?.data);
                if (error.response?.data?.message === "jwt expired") {
                    navigate("/login");
                    localStorage.removeItem("token");
                    setToken("");
                    toast.error("Session expired. Please login again.");
                }
                else {
                    toast.error(error.response?.data?.message || "Something went wrong");
                }
            }
        }
    }


    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items])
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
        }
        return totalCount;
    }

    //     useEffect(()=>{
    // console.log(cartItems);
    //     },[cartItems])

    const updateQuantity = async (itemId, size, quantity) => {
      
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] = quantity;
            }
        }
        setCartItems(cartData)
          if (!token) {
            navigate("/login");
            toast.error("Please login to update cart.");
            return;
        }
        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token: token || localStorage.getItem('token') } })
            } catch (error) {
                if (error.response?.data?.message === "jwt expired") {
                    navigate("/login");
                    localStorage.removeItem("token");
                    setToken("");
                    toast.error("Session expired. Please login again.");
                }
                else {
                    toast.error(error.response?.data?.message || "Something went wrong");
                }
            }
        }
    }

    const getUserCart=async()=>{
        if (!token){
            navigate("/login");
            toast.error("Please login to view cart.");
            return;
        }
         if (token){
        try{
           
            console.log("Fetching user cart...");
            const response=await axios.get(backendUrl+'/api/cart/user',{headers:{token:token||localStorage.getItem('token')}})
            if(response.data.success){
                setCartItems(response.data.cartData)
                console.log(cartItems)
            }
            else{
                console.log(response.data.message)
                toast.error(response.data.message)
            }
        }
       catch (error) {
                if (error.response?.data?.message === "jwt expired") {
                    navigate("/login");
                    localStorage.removeItem("token");
                    setToken("");
                    toast.error("Session expired. Please login again.");
                }
                else {
                    toast.error(error.response?.data?.message || "Something went wrong");
                }
            }}
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items])
                try {
                    if (cartItems[items][item] > 0) {
                        const productData = products.find(product => product._id === items)
                        totalAmount += cartItems[items][item] * productData.price
                    }
                } catch (error) {

                }
        }
        return totalAmount;
    }


    const getProductsData = async (token) => {
        try {
            // console.log(backendUrl + "  arha ha kia");
            const response = await axios.get(backendUrl + '/api/product/list')
            // console.log(response.data);
            if (response.data.success) {
                setProducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Error fetching products')
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
        // if(!token && localStorage.getItem('token')){
        //     setToken(localStorage.getItem('token'))
        //     getUserCart(localStorage.getItem('token'))
        // } 
        if (token) {
            getUserCart()
        }
    }, [token])

    const value = {
        products, currency, deliver_fees,
        search, setSearch, showSearch, setShowSearch,setCartItems,
        cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, token, setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;