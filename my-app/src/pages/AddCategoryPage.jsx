import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from "../components/Layout";

const AddCategoryPage = () => {
  const [name, setName] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/categories', { name });
      toast.success("Category added");
      navigate('/categories');
    } catch (err) {
      toast.error("Add failed");
    }
  };

  return (
    <Layout>
      <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Category Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
          />
        </div>
        <button className="btn btn-success">Submit</button>
      </form>
      </div>
    </Layout>
  );
};

export default AddCategoryPage;
