// controllers/productController.js
const { Brand } = require('../models');
const { Op } = require("sequelize");
//console.log("Looking for models in:", require("path").resolve(__dirname, "../models"));

exports.create = async (req, res) => {
  const { name } = req.body;
  const image = req.file?.filename || null;
  try {
    const brand = await Brand.create({ name, image });
    res.json(brand);
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
            
          ],
        }
      : {};

    const { count, rows } = await Brand.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", "DESC"]],
    });

    res.json({
      brands: rows,
      total: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: err.message });
  }
};




exports.getBrandById = async (req, res) => {
  try {
    const id = req.params.id;
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ message: 'brand not found' });
    }
    res.json(brand);
  } catch (error) {
    console.error('Error fetching brand  by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.update = async (req, res) => {
  const { id } = req.params;
 const { name } = req.body;
  const image = req.file?.filename;

  try {
    const brand = await Brand.findByPk(id);
    if (!brand) return res.status(404).json({ message: "Not found" });
    brand.name = name;
    if (image) brand.image = image;
    await brand.save();
    res.json(brand);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Brand.destroy({ where: { id } });
    res.json({ deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
