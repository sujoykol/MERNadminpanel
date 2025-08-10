import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from "../components/Layout";


const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
     const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    detail: '',
    image: '',
    categoryId:''
  });

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

  useEffect(() => {
    if (!id) return;

    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => {
        setForm(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        toast.error("Failed to fetch product");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, form);
      toast.success('Product updated successfully');
      navigate('/products');
    } catch (err) {
      toast.error('Failed to update product');
    }
  };

  return (
    <Layout>
    <div className="container mt-5">
      <h3>Edit Product</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Product Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input name="price" value={form.price} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea name="detail" value={form.detail} onChange={handleChange} className="form-control"></textarea>
        </div>
        <div className="mb-3">
      <label className="form-label">Category</label>
      <select
        className="form-select"
        value={form.categoryId}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, categoryId: e.target.value }))
        }
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
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

export default EditProductPage;
