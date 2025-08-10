import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import Layout from "../components/Layout";

const SliderListPage = () => {
  const [sliders, setSliders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  // Debounced value of search to reduce API calls
  const [debouncedSearch] = useDebounce(search, 500);

  const fetchSliders = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/sliders`, {
        params: { search: debouncedSearch, page, limit },
      });
      setSliders(res.data.sliders || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      toast.error('Failed to load Sliders');
    }
  };

  const deleteSlider = async (id) => {
    if (window.confirm('Are you sure to delete this slider?')) {
      try {
        await axios.delete(`http://localhost:5000/api/sliders/${id}`);
        toast.success('Slider deleted');
        fetchSliders();
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
    fetchSliders();
  }, [debouncedSearch, page]);

  return (
    <div>
      <Layout>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Slider List</h2>
        <Link to="/sliders/new" className="btn btn-success">Add New</Link>
      </div>

      <input
        type="text"
        placeholder="Search by slider name"
        className="form-control mb-3"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sliders.length ? sliders.map(slider => (
            <tr key={slider.id}>
              <td>{slider.name}</td>
              
              <td>
                {slider.image && (
                  <img
                    src={`http://localhost:5000/uploads/slider/${slider.image}`}
                    alt=""
                    style={{ width: "80px", height: "60px", objectFit: "cover" }}
                  />
                )}
              </td>
              
              <td>
                <Link to={`/sliders/edit/${slider.id}`} className="btn btn-sm btn-primary me-2">Edit</Link>
                <button className="btn btn-sm btn-danger" onClick={() => deleteSlider(slider.id)}>Delete</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5" className="text-center">No Slider Found</td></tr>
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
    </div>
  );
};

export default SliderListPage;
