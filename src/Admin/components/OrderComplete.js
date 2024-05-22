import React, { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Orders from './Orders';

function OrderComplete() {
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = () => {
    axios.get('http://localhost:8081/completed-orders')
      .then(res => {
        setCompletedOrders(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8081/orders-completed/${orderId}`);
      setCompletedOrders(completedOrders.filter(order => order.id !== orderId));
      window.alert('Completedorder delete successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className="ordercontainer py-4">
        <div className="row">
          <div className="col-12">
            <h3 className="">Complete Orders</h3>
            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Action
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/ordercomplete">Completed</a></li>
                <li><a className="dropdown-item" href="/ordercancle">Cancel</a></li>
              </ul>
            </div>
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h5 className="text-black text-capitalize ps-3">
                    Completed Orders
                  </h5>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center justify-content-center ">
                    <thead>
                      <tr>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>TotalPrice</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedOrders.map(order => (
                        <tr key={order.id}>
                          <td>{order.customername}</td>
                          <td>{order.pname}</td>
                          <td>{order.oqty}</td>
                          <td>{order.price}</td>
                          <td>{order.totalprice}</td>
                          <td>{order.address}</td>
                          <td>{order.contact}</td>
                          <td>{order.date}</td>
                          <td>
                            <button className="btn btn-danger mx-2" onClick={() => handleDelete(order.id)}>
                              Delete
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
      </div>
      <Header />
    </>
  );
}

export default OrderComplete;
