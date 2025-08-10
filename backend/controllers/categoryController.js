const { Category } = require('../models');

// Get all categories
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

    const { count, rows } = await Category.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["id", "DESC"]],
    });

    res.json({
      categories: rows,
      total: count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: err.message });
  }


};

// Get one
exports.getById = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: "Not found" });
  res.json(category);
};

// Create
exports.create = async (req, res) => {
  console.log("BODY:", req.body); // ✅ should log: { name: "Electronics" }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  // Save to DB (Sequelize)
  const category = await Category.create({ name });
  res.status(201).json(category);
};



// Update
exports.update = async (req, res) => {
  const { name } = req.body;
  const category = await Category.findByPk(req.params.id);

  if (!category) return res.status(404).json({ error: "Not found" });

  category.name = name;
  await category.save();
  res.json(category);
};

// Delete
exports.remove = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) return res.status(404).json({ error: "Not found" });

  await category.destroy();
  res.json({ message: "Deleted" });
};
