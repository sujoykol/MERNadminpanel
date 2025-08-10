const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const sequelize = require("./config/db"); // Sequelize DB connection
const productRoutes = require("./routes/product");
const brandRoutes = require("./routes/brand");
const sliderRoutes = require("./routes/slider");
const authRoutes = require('./routes/authRoutes');
const db = require('./models');
const cookieParser = require("cookie-parser");



db.sequelize.authenticate()
  .then(() => {
    console.log("✅ DB connected.");
    return db.sequelize.sync(); // Create tables
  })
  .catch((err) => {
    console.error("❌ DB error:", err);
  });


// Load .env
dotenv.config();

// Initialize app
const app = express();
app.use(cookieParser());
// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // ✅ Your React app URL
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']               // ✅ Allow cookies/authorization headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads/brands", express.static(path.join(__dirname, "uploads/brands"))); // Serve images

// Routes
app.use('/api', authRoutes);
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/brands', brandRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sliders", sliderRoutes);



// DB Test + Sync
sequelize.authenticate()
  .then(() => {
    console.log("✅ MySQL connected.");
    return sequelize.sync(); // Sync models
  })
  .then(() => {
    console.log("✅ DB synced.");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
