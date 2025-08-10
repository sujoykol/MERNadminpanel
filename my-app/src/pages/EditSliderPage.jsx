import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from "../components/Layout";

const EditBrandPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    image: ''
  });

 

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/api/sliders/${id}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => {
        console.error("Error fetching brand:", err);
        toast.error("Failed to fetch brand");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/sliders/${id}`, form);
      toast.success('Slider updated successfully');
      navigate('/sliders');
    } catch (err) {
      toast.error('Failed to update slider');
    }
  };

  return (
    <Layout>
    <div className="container mt-5">
      <h3>Edit Slider</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Slider Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Image URL</label>
          <input name="image" value={form.image} onChange={handleChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
        
      </form>
    </div>
    </Layout>
  );
};

export default EditBrandPage;
