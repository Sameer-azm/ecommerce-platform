import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from 'sonner'

const Verify = () => {
    useEffect(() => {
    verifyPayment();
  }, []);

  const { backendUrl, token,navigate } = useContext(ShopContext);

  const location = useLocation();

  
    const verifyPayment = async () => {
        try {
           const searchParams = new URLSearchParams(location.search);

      const success = searchParams.get("success");
      const orderId = searchParams.get("orderId");

      const response = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success("Order sucessfully placed")
        navigate("/orders");
      } else {
        toast.error("Unable to place order")
        navigate("/cart");
      }
    } 
         catch (error) {
            console.log(error)
        }
    }


  return 
  <div>Verifying Payment...</div>;
};

export default Verify;