
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/products.css";
import Header from "./Header";
import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit } from '@fortawesome/free-solid-svg-icons';

const Products = () => {
  const [products, setProducts] = useState([]);
  // const [editProduct, setEditProduct] = useState(null);
  // const navigate = useNavigate();


  useEffect(() => {
    axios.get('http://localhost:8081/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8081/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
      window.alert('delete product sucessfull');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // const handleEdit = (product) => {
  //   setEditProduct(product);
  //   navigate(`/updateproduct`, { state: { product } });
  // };

  return (
    <>
      <div className="product-container py-4">
        <div className="row">
          <div className="col-12">
            <h3>Products Page Here</h3>
            <div className="btn-group">
              <Link to="/addproduct">
                <button className="btn btn-secondary" type="button">
                  Add Product
                </button>
              </Link>
            </div>
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <h4 className="text-black text-capitalize ps-3">
                    Products table
                  </h4>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center justify-content-center">
                    <thead>
                      <tr>
                        <th>Img</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id}>
                          <td>
                            <img
                            src={`http://localhost:8081/images/${product.image}`}
                              alt=""
                              className="product-img"
                            />
                          </td>
                          <td>{product.name}</td>
                          <td>₹{product.price}</td>
                          <td>{product.description}</td>
                          <td>
                            {/* <button className="btn btn-primary mx-2" onClick={() => handleEdit(product)}>Edit</button> */}
                            
                            <Link to ={`/updateproduct/${product.id}`} className="btn btn-primary mx-2" >
                              {/* <FontAwesomeIcon icon={faEdit}/> */}
                              Edit
                            </Link>
                            <button className="btn btn-danger btn-cancel" onClick={() => deleteProduct(product.id)}>
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

export default Products;
