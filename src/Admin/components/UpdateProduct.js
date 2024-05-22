import React, { useEffect, useState } from "react";
import "../css/addproduct.css";
import Header from "./Header";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();

  const [productData, setProductData] = useState({
    image: '',
    name: '',
    price: '',
    description: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/search/${id}`)
      .then(res => {
        const product = res.data[0];
        setProductData({
          image: product.image,
          name: product.name,
          price: product.price,
          description: product.description
        });
      })
      .catch(err => console.log(err));
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', productData.image);
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);

    try {
      await axios.put(`http://localhost:8081/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Data updated successfully')
      navigate('/product');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <title>Update Product Page</title>
      <div className="add-product-container">
        <h2>Update Product</h2>
        <form onSubmit={handleUpdate}>
          <label htmlFor="productImage">Product Image:</label>
          <input
            type="file"
            accept="image/*"
            className="form-control-file"
            id="productImage"
            onChange={(e) => setProductData({...productData, image: e.target.files[0]})}
            required
          />

          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={productData.name} 
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Price:</label>
          <input 
            type="number" 
            id="price" 
            name="price" 
            value={productData.price}
            onChange={handleChange}
            required 
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={productData.description}
            onChange={handleChange}
            name="description"
          ></textarea>

          <button type="submit">
            Update
          </button>
          <button type="reset" className="cancel">
            Cancel
          </button>
        </form>
      </div>
      <Header />
    </>
  );
}

export default UpdateProduct;
