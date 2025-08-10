const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Initialize models
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Product = require("./Product")(sequelize, DataTypes);
const Category = require('./category')(sequelize, Sequelize.DataTypes);
const Brand = require('./brand')(sequelize, Sequelize.DataTypes);
const Slider = require('./slider')(sequelize, Sequelize.DataTypes);

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Category = Category;
db.Product = Product;
db.Brand = Brand;
db.Slider = Slider;
db.User = User;

module.exports = db;
