// src/pages/AddProductPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from "../components/Layout";

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState('');
   const [categories, setCategories] = useState([]);
 
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('detail', detail);
      formData.append('categoryId', categoryId);
      if (image) formData.append('image', image);

      await axios.post('http://localhost:5000/api/products', formData);
      toast.success('Product added!');
      navigate('/products');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add product.');
    }
  };

  return (
    <Layout>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" required
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input type="number" className="form-control" required
            value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="mb-3">
          <label>Detail</label>
          <textarea className="form-control" required
            value={detail} onChange={(e) => setDetail(e.target.value)} />
        </div>
         
      <div className="mb-3">
      <label className="form-label">Category</label>
      <select
  className="form-select"
  value={categoryId}
  onChange={(e) => setCategoryId(e.target.value)}
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>

    </div>

        <div className="mb-3">
          <label>Image</label>
          <input type="file" className="form-control"
            onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <button type="submit" className="btn btn-success">Add Product</button>
      </form>
    </Layout>
  );
};

export default AddProductPage;
