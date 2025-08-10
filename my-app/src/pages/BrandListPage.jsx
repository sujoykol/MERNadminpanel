import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import Layout from "../components/Layout";

const BrandListPage = () => {
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  // Debounced value of search to reduce API calls
  const [debouncedSearch] = useDebounce(search, 500);

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/brands`, {
        params: { search: debouncedSearch, page, limit },
      });
      setBrands(res.data.brands || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      toast.error('Failed to load brands');
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure to delete this brand?')) {
      try {
        await axios.delete(`http://localhost:5000/api/brands/${id}`);
        toast.success('Brand deleted');
        fetchBrands();
      } catch {
        toast.error('Delete failed');
      }
    }
  };

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [debouncedSearch, page]);

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
  <h2 className="mb-0">Brand List</h2>

  <input
    type="text"
    placeholder="Search by brand name"
    className="form-control"
    style={{ maxWidth: "250px" }}
    value={search}
    onChange={(e) => {
      setPage(1);
      setSearch(e.target.value);
    }}
  />

  <Link to="/brands/new" className="btn btn-success">
    Add New
  </Link>
</div>


      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands.length ? brands.map(brand => (
            <tr key={brand.id}>
              <td>{brand.name}</td>
              
              <td>
                {brand.image && (
                  <img
                    src={`http://localhost:5000/uploads/brands/${brand.image}`}
                    alt=""
                    style={{ width: "80px", height: "60px", objectFit: "cover" }}
                  />
                )}
              </td>
              
              <td>
                <Link to={`/brands/edit/${brand.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(brand.id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="text-center">No Brands Found</td></tr>
          )}
        </tbody>
      </table>

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
    </Layout>
  );
};

export default BrandListPage;
