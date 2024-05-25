import React, { useEffect, useState } from "react";
import "../css/orderstatus.css";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import axios from "axios";
function OrderStatus() {


  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8081/orders')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Function to render status message based on order status
  const renderStatusMessage = (status) => {
    if (status === "inprogress") {
      return <span className="text-warning">In Progress</span>;
    } else if (status === "completed") {
      return <span className="text-success">Completed</span>;
    } else if (status === "cancelled") {
      return <span className="text-danger">Cancelled</span>;
    } 
    else {
      return <span className="text-muted">Unknown</span>;
    }
  };


  const handleCancelOrder = (orderId) => {
    axios.put(`http://localhost:8081/orders/${orderId}`, { status: 'cancelled' })
      .then(res => {
        const updatedProducts = products.map(product => {
          if (product.id === orderId) {
            return { ...product, status: 'cancelled' };
          }
          return product;
        });
        setProducts(updatedProducts);
        window.alert('Order cancelled successfully.');
      })
      .catch(err => {
        console.error(err);
        window.alert('Error cancelling order.');
      });
  };


  return (
    <>
     
      <head>
        <title>Order Status</title>
      </head>
      <div className="ordercontainer">
        <h3 className="mt-4 mb-4">Order Status</h3>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>TotalPrice</th>
              <th>Address</th>
              <th>Status</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
            <tr key={product.id}>
              <td>{product.pname}</td>
              <td>{product.oqty}</td>
              <td>{product.price}</td>
              <td>{product.totalprice}</td>
              <td>{product.address}</td>
              <td style={{ fontWeight: 'bold' }}>{renderStatusMessage(product.status)} </td>
              <td>{product.date}</td>
              <td>
                <button
                    className="btn btn-danger btn-cancel"
                    onClick={() => handleCancelOrder(product.id)}
                    disabled={product.status === 'completed' || product.status === 'cancelled'}
                    >Cancel
                </button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MainHeader />
      <MainFooter />
    </>
  );
}

export default OrderStatus;
