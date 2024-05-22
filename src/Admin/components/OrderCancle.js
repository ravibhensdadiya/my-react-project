import React, { useEffect, useState } from "react";
import "../css/orders.css";
import Header from "./Header";
import axios from "axios";
// import MainHeader from "./MainHeader";
// import MainFooter from "./MainFooter";
function OrderCancle() {

  const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    fetchCancelledOrders();
  }, []);

  const fetchCancelledOrders = () => {
    axios.get('http://localhost:8081/cancelled-orders')
      .then(res => {
        setCancelledOrders(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const cancelledOrderdelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8081/orders-cancelled/${orderId}`);
      setCancelledOrders(cancelledOrders.filter(order => order.id !== orderId));
      window.alert('Cancel order delete successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className="ordercontainer py-4">
        <div className="row">
          <div className="col-12">
            <h3 className="">Cancle Orders</h3>
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
              <div className="card-header p-0 position-relative mt-n4 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h5 className="text-black text-capitalize ps-3">
                    Cancled Orders
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
                      {cancelledOrders.map(order =>(
                      <tr>
                        <td>{order.customername}</td>
                        <td>{order.pname}</td>
                        <td>{order.oqty}</td>
                        <td>{order.price}</td>
                        <td>{order.totalprice}</td>
                        <td>{order.address}</td>
                        <td>{order.contact}</td>
                        <td>{order.date}</td>
                        <td>
                          <button className="btn btn-danger mx-2 " onClick={() =>cancelledOrderdelete(order.id)}>Delete</button>
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

export default OrderCancle;
