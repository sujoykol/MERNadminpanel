import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../components/Layout";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Client-side validation
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      // ✅ Get token from localStorage (saved at login)
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in first");
        navigate("/login");
        return;
      }

      // ✅ Send request to backend
      const res = await axios.post(
        "http://localhost:5000/api/change-password",
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Password updated successfully");

      // ✅ Optional: redirect after change
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/dashboard");
    } catch (err) {
      // Handle error message from API
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Server error");
      }
    }
  };

  return (
    <Layout>
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div>
          <label>Old Password</label>
          <input
            type="password" className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>New Password</label>
          <input
            type="password" className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm New Password</label>
          <input
            type="password" className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success mt-3">Update Password</button>
      </form>
    </div>
    </Layout>
  );
}

export default ChangePassword;
