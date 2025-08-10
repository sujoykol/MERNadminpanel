// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import LogoutLink from "./LogoutButton";

export default function AdminLayout() {
  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/" className="nav-link">Home</a>
          </li>
        </ul>
      </nav>

      {/* Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="/" className="brand-link">
          <span className="brand-text font-weight-light">AdminLTE React</span>
        </a>
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview">
              <li className="nav-item">
                <a href="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt"></i>
                  <p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/products" className="nav-link">
                  <i className="nav-icon fas fa-box"></i>
                  <p>Products</p>
                </a>
              </li>
              
                <li className="nav-item">
                <a href="/change-password" className="nav-link text-danger">
                  <i className="nav-icon fas fa-sign-out-alt"></i>
                  <p>Change Password</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/logout" className="nav-link text-danger">
                  <i className="nav-icon fas fa-sign-out-alt"></i>
                  <p>Logout</p>
                </a>
              </li>
               <li className="nav-item">
                 <LogoutLink />
              </li>

              
            </ul>
          </nav>
        </div>
      </aside>

      {/* Content */}
      <div className="content-wrapper">
        <div className="content pt-3 px-3">
          <Outlet /> {/* This is where page content will be rendered */}
        </div>
      </div>

      {/* Footer */}
      <footer className="main-footer text-center">
        <strong>&copy; 2024 - 2025 <a href="/">Your Company</a>.</strong> All rights reserved.
      </footer>
    </div>
  );
}
