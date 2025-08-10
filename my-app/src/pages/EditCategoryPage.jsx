import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from "../components/Layout";

const EditCategoryPage = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/categories/${id}`);
        setName(res.data.name);
      } catch {
        toast.error("Failed to fetch category");
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/categories/${id}`, { name });
      toast.success("Category updated");
      navigate('/categories');
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
     <Layout>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Category Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
   </Layout>
  );
};

export default EditCategoryPage;
