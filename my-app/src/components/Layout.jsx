import React from 'react';
import LogoutLink from "./LogoutButton";

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#"><i className="fas fa-bars"></i></a>
          </li>
        </ul>
      </nav>

      {/* Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a href="#" className="brand-link">
          <span className="brand-text font-weight-light">Admin Panel</span>
        </a>
        <div className="sidebar">
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
               <li className="nav-item">
                <a href="/sliders" className="nav-link">
                  <i className="nav-icon fas fa-box"></i>
                  <p>Sliders</p>
                </a>
              </li>
               <li className="nav-item">
                <a href="/categories" className="nav-link">
                  <i className="nav-icon fas fa-box"></i>
                  <p>Categories</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/products" className="nav-link">
                  <i className="nav-icon fas fa-box"></i>
                  <p>Products</p>
                </a>
              </li>
               <li className="nav-item">
                <a href="/brands" className="nav-link">
                  <i className="nav-icon fas fa-box"></i>
                  <p>Brands</p>
                </a>
              </li>
               <li className="nav-item">
                <a href="/change-password" className="nav-link">
                  <i className="nav-icon fas fa-box"></i>
                  <p>Change Password</p>
                </a>
              </li>
                <li className="nav-item">
                 
                  <LogoutLink />
              </li>

             
              {/* Add other links */}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Content Wrapper */}
      <div className="content-wrapper">
        <section className="content pt-3 px-3">
          {children}
        </section>
      </div>

      {/* Footer */}
      <footer className="main-footer text-sm">
        <strong>Copyright © 2025</strong>
        All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
