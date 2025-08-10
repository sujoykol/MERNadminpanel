// controllers/productController.js
const { Product, Category } = require('../models');
const { Op } = require("sequelize");
//console.log("Looking for models in:", require("path").resolve(__dirname, "../models"));

exports.create = async (req, res) => {
  const { name, price, detail, categoryId } = req.body;
  const image = req.file?.filename || null;
  try {
    const product = await Product.create({ name, price, detail, image, categoryId });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getAll = async (req, res) => {
  const { search = "", page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const { Op } = require("sequelize");
    const whereClause = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { detail: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      include: {
        model: Category,
        attributes: ['name']  // Include only category name
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "DESC"]],
    });

    res.json({
      products: rows,
      total: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: err.message });
  }
};




exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.update = async (req, res) => {
  const { id } = req.params;
 const { name, price, detail, categoryId } = req.body;
  const image = req.file?.filename;

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: "Not found" });

    product.name = name;
    product.price = price;
    product.detail = detail;
    product.categoryId = categoryId;
    if (image) product.image = image;

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Product.destroy({ where: { id } });
    res.json({ deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
