import React, { useState } from "react";
import axios from "axios";

const ProductForm = ({ onProductCreated }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("detail", detail);
      if (image) formData.append("image", image);

      const res = await axios.post("http://localhost:5000/api/products", formData);

      setMessage("✅ Product added successfully!");
      setName("");
      setPrice("");
      setDetail("");
      setImage(null);
      if (onProductCreated) onProductCreated(); // Refresh product list
    } catch (err) {
      console.error("Product creation failed:", err);
      setMessage("❌ Error adding product.");
    }
  };

  return (
    <div className="container mb-4">
      <h4>Add New Product</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Details"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <button type="submit" className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
