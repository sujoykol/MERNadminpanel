import { Routes, Route, Navigate } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import CategoryListPage from './pages/CategoryListPage';
import AddCategoryPage from './pages/AddCategoryPage';
import EditCategoryPage from './pages/EditCategoryPage';
import BrandListPage from './pages/BrandListPage';
import AddBrandPage from './pages/AddBrandPage';
import EditBrandPage from './pages/EditBrandPage';
import SliderListPage from './pages/SliderListPage';
import AddSliderPage from './pages/AddSliderPage';
import EditSliderPage from './pages/EditSliderPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/dashboard';
import ChangePassword from './pages/ChangePassword';
import PrivateRoute from './components/PrivateRoute';



function App() {
 
  return (
   
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>}/>
        <Route path="/sliders" element={<PrivateRoute><SliderListPage /></PrivateRoute>} />
        <Route path="/sliders/new" element={<PrivateRoute><AddSliderPage /></PrivateRoute>} />
        <Route path="/sliders/edit/:id" element={<PrivateRoute><EditSliderPage /></PrivateRoute>} />
        <Route path="/brands" element={<PrivateRoute><BrandListPage /></PrivateRoute>} />
        <Route path="/brands/new" element={<PrivateRoute><AddBrandPage /></PrivateRoute>} />
        <Route path="/brands/edit/:id" element={<PrivateRoute><EditBrandPage /></PrivateRoute>} />
        <Route path="/categories" element={<PrivateRoute><CategoryListPage /></PrivateRoute>} />
        <Route path="/categories/new" element={<PrivateRoute><AddCategoryPage /></PrivateRoute>} />
        <Route path="/categories/edit/:id" element={<PrivateRoute><EditCategoryPage /></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><ProductListPage /></PrivateRoute>} />
        <Route path="/products/new" element={<PrivateRoute><AddProductPage /></PrivateRoute>} />
        <Route path="/products/edit/:id" element={<PrivateRoute><EditProductPage /></PrivateRoute>} />
      </Routes>
   
  );
}

export default App;
