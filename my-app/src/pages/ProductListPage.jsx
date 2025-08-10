import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import LogoutButton from "../components/LogoutButton";
import Layout from "../components/Layout";


const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  // Debounced value of search to reduce API calls
  const [debouncedSearch] = useDebounce(search, 500);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products`, {
        params: { search: debouncedSearch, page, limit },
      });
      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      toast.error('Failed to load products');
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        toast.success('Product deleted');
        fetchProducts();
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
    fetchProducts();
  }, [debouncedSearch, page]);

  return (
    
    
      <Layout>
         <div className="card">
          <div className="card-header d-flex flex-wrap justify-content-between align-items-center">
  <h3 className="card-title mb-2 mb-md-0">Product List</h3>

  <div className="d-flex flex-wrap gap-2">
    <Link to="/products/new" className="btn btn-success me-2 mb-2 mb-md-0">
      <i className="fas fa-plus"></i> Add New
    </Link>

    <input
      type="text"
      placeholder="Search by product name"
      className="form-control"
      style={{ minWidth: "200px" }}
      value={search}
      onChange={(e) => {
        setPage(1);
        setSearch(e.target.value);
      }}
    />
  </div>
</div>

          <div className="card-body">

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Detail</th>
            <th>Image</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length ? products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.detail}</td>
              <td>
                {product.image && (
                  <img
                    src={`http://localhost:5000/uploads/${product.image}`}
                    alt=""
                    style={{ width: "80px", height: "60px", objectFit: "cover" }}
                  />
                )}
              </td>
               <td>{product.Category?.name || 'Uncategorized'}</td> {/* 👈 Category name */}
              <td>
                <Link to={`/products/edit/${product.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => deleteProduct(product.id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="text-center">No Products Found</td></tr>
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
      </div>
       </div>
      </Layout>
   
  );
};

export default ProductListPage;
