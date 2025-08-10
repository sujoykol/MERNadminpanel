import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Layout from "../components/Layout";

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories', {
        params: { page, limit },
      });
      setCategories(res.data.categories || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      toast.error("Failed to load categories");
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure to delete this category?")) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        toast.success("Category deleted");
        fetchCategories(); // reload
      } catch {
        toast.error("Delete failed");
      }
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page]);

  const goToPage = (num) => {
    if (num >= 1 && num <= totalPages) setPage(num);
  };

  return (
    <Layout>
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Categories</h2>
        <Link to="/categories/new" className="btn btn-success">Add New</Link>
      </div>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th style={{ width: '180px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.name}</td>
              <td>
                <Link to={`/categories/edit/${cat.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <button onClick={() => deleteCategory(cat.id)} className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="2" className="text-center">No Categories Found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 && 'disabled'}`}>
            <button className="page-link" onClick={() => goToPage(page - 1)}>Prev</button>
          </li>
          {[...Array(totalPages)].map((_, idx) => (
            <li key={idx} className={`page-item ${page === idx + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => goToPage(idx + 1)}>{idx + 1}</button>
            </li>
          ))}
          <li className={`page-item ${page === totalPages && 'disabled'}`}>
            <button className="page-link" onClick={() => goToPage(page + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
    </Layout>
  );
};

export default CategoryListPage;
