import React, { useEffect, useState } from 'react'
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import { Navigate, useHistory, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function Product() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Create navigate function for navigation

  useEffect(() => {
    axios.get('http://localhost:8081/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Handle Buy Now button click
  const handleBuyNow = (productName, productPrice) => {
    // Navigate to User Info page with product details
    navigate('/userinfo', { state: { productName, productPrice } });
  };

  return (
   <>
    <section id="menu" className="menu">
      <div className="container" data-aos="fade-up" />

        <div className="section-header">
          <h2>Our Products</h2>
          <p>Check Our <span>Industro Products</span></p>
        </div>

        <ul className="nav nav-tabs d-flex justify-content-center" data-aos="fade-up" data-aos-delay="200">

       
        </ul>

        <div className="tab-content" data-aos="fade-up" data-aos-delay="300">

          <div className="tab-pane fade active show" id="menu-starte₹">

            <div className="tab-header text-center">
              <h3>Hardware</h3>
            </div>

            
            <div className="row gy-5">
              {products.map(product => (
              <div className="col-lg-4 menu-item">
                <a href=''
                className="glightbox">
                  <img
                  src={`http://localhost:8081/images/${product.image}`} 
                  className="menu-img img-fluid" alt="" /></a>
                <h4>{product.name}</h4>
                <p className="ingredients">
                  {product.description}
                </p>
                <p className="price">
                ₹{product.price}
                </p>
                <a className="buy-button"
                onClick={() => handleBuyNow(product.name, product.price)}
                // onClick={() => handleBuyNow(product.name, product.price)}
                >Buy Now</a>
              </div>
                ))}
            </div>
          </div>

          </div>
    </section>
    <MainHeader />
    <MainFooter />
   </>
  );
}

export default Product