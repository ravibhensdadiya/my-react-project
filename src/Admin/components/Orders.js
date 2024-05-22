import React, { useEffect, useState } from "react";
import "../css/orders.css";
import Header from "./Header";
import axios from "axios";

function Orders() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:8081/orders')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCompleteOrder = (orderId) => {
    axios.put(`http://localhost:8081/orders/${orderId}`, { status: 'completed' })
      .then(res => {
        const updatedProducts = products.map(product => {
          if (product.id === orderId) {
            return { ...product, status: 'completed' };
          }
          return product;
        });
        setProducts(updatedProducts);
        window.alert('Order completed successfully.');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="ordercontainer py-4">
        <div className="row">
          <div className="col-12">
            <h3>Orders Page Here</h3>
            <div class="btn-group">
                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                  Action
                </button>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/ordercomplete">Completed</a></li>
                    <li><a class="dropdown-item" href="/ordercancle">Cancel</a></li>
                  </ul>
                </div>
            <div className="card my-4">
              <div className="card-header">
                <h5>New Orders</h5>
              </div>
              <div className="card-body px-0 pb-2">
                <table className="table align-items-center justify-content-center">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total Price</th>
                      <th>Address</th>
                      <th>Contact</th>
                      <th>Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id}>
                        <td>{product.customername}</td>
                        <td>{product.pname}</td>
                        <td>{product.oqty}</td>
                        <td>{product.price}</td>
                        <td>{product.totalprice}</td>
                        <td>{product.address}</td>
                        <td>{product.contact}</td>
                        <td>{product.date}</td>
                        <td>
                            <button
                              className="btn btn-success"
                              onClick={() => handleCompleteOrder(product.id)}
                              disabled={product.status === 'completed' || product.status ==='cancelled'}
                            >Complete
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Header />
    </>
  );
}

export default Orders;
