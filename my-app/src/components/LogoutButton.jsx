// src/components/LogoutButton.jsx
import { logout } from "../services/authService";
import { removeAccessToken } from "../utils/tokenHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      try {
        localStorage.removeItem("token"); // clear the token
        await logout(); // clears refresh token from server
        removeAccessToken();
         toast.success("Log Out successful"); // clears access token from localStorage
        navigate("/login"); // redirect to login page
      } catch (error) {
        console.error("Logout failed", error);
      }
    }
  };

  return (
     
    <a href="#" className="nav-link" onClick={(e) => {
      e.preventDefault();
      handleLogout();
    }}>
       <i className="nav-icon fas fa-box"></i>
      <p>Logout</p>
    </a>
  );
};

export default LogoutButton;
