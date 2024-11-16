import React, { useState } from "react";
import "../css/addproduct.css";
import Header from "./Header";
import axios from "axios";

function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:8081/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('product add successfully');

      // Clear form data after successful submission
      handleClear();
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error uploading data');
    }
  };

  const handleClear = () => {
    // Clear form data
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  return (
    <>
      <title>Add Product Page</title>
      <div className="add-product-container">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label for="productImage">Product Image:</label>
          <input
            type="file"
            className="form-control-file"
            onChange={(e) => setImage(e.target.files[0])}
            id="productImage"
            required
          />

          <label for="name">Name:</label>
          <input type="text" id="name" name="name"  value={name} onChange={(e) => setName(e.target.value)} required />

          <label for="price">Price:</label>
          <input type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />

          <label for="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description} onChange={(e) => setDescription(e.target.value)}
            // rows="4"
            // min="50"
          ></textarea>

          <button type="submit">
            Add
          </button>
          <button type="reset" className="cancel" onClick={handleClear}>
            Cancel
          </button>
        </form>
      </div>
      <Header />
    </>
  );
}

export default AddProduct;