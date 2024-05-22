import React, { useEffect, useState } from "react";
import "../css/userinfo.css";
import MainHeader from "./MainHeader";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function Userinfo() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    pname: '',
    price: '',
    customername: "",
    contact: '',
    oqty: "",
    address: "",
  });

  const [isOrderInProgress, setIsOrderInProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (location.state && location.state.productName && location.state.productPrice) {
      setProductData({
        pname: location.state.productName,
        price: location.state.productPrice
      });
    } else {
      axios.get(`http://localhost:8081/search/${id}`)
        .then(res => {
          const product = res.data[0];
          setProductData({
            pname: product.name,
            price: product.price
          });
        })
        .catch(err => console.log(err));
    }
  }, [id, location.state]);


  const placeOrder = () => {
    setIsOrderInProgress(true);

    const totalPrice = parseFloat(productData.price) * parseInt(productData.oqty);

    const orderData = {
      pname: productData.pname,
      price: productData.price,
      customername: productData.customername,
      contact: productData.contact,
      oqty: productData.oqty,
      address: productData.address,
      date: new Date().toISOString(),
      // date: new Date().toISOString(), // Use system time as timestamp
      // timestamp: new Date().toISOString(), 
      totalPrice: totalPrice,
      status: "inprogress",
    };

    axios.post("http://localhost:8081/orders", orderData)
      .then((response) => {
        setIsOrderInProgress(false);
        setSuccessMessage("Order placed successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/orderstatus");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setIsOrderInProgress(false);
      });
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const cancelOrder = () => {
    // Reset form fields or perform any cleanup logic
    setProductData({
      ...productData,
      customername: "",
      contact: "",
      oqty: "",
      address: "",
    });

  };

  return (
    <>
      <title>User Information Page</title>
      <div className="user-info-container">
        <h3>User Information</h3>
        <form>
          <label for="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.pname}
            onChange={handleChange}
            required
            readOnly
          />

          <label for="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            readOnly
          />

          <label for="customername">Name:</label>
          <input
            type="text"
            id="customername"
            name="customername"
            placeholder="Your name"
            value={productData.customername}
            onChange={handleChange}
            required
          />

          <label for="contact">Contact Number:</label>
          <input
            type="tel"
            id="contact"
            name="contact"
            pattern="[0-9]{10}"
            value={productData.contact}
            onChange={handleChange}
            required
          />
        

          <label for="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="oqty"
            onChange={handleChange}
            value={productData.oqty}
            min="1"
            required
          />

          <label for="address">Address:</label>
          <textarea
            id="address"
            name="address"
            onChange={handleChange}
            value={productData.address}
            rows="4"
            required
          ></textarea>

          <button type="button" onClick={placeOrder} disabled={isOrderInProgress}>
            Order
          </button>
          <button type="button" className="cancel" onClick={cancelOrder}>
            Cancel
          </button>
        </form>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
      <MainHeader />
    </>
  );
}

export default Userinfo;



