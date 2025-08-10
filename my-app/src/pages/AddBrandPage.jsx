// src/pages/AddProductPage.jsx
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from "../components/Layout";

const AddBrandPage = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
 
  
  const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      if (image) formData.append('image', image);
      await axios.post('http://localhost:5000/api/brands', formData);
      toast.success('Brand added!');
      navigate('/brands');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add brand.');
    }
  };
 
  return (
    <Layout>
      <h2>Add New Brand</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" required
            value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Image</label>
          <input type="file" className="form-control"
            onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <button type="submit" className="btn btn-success">Add Brand</button>
      </form>
    </Layout>
  );
};

export default AddBrandPage;
