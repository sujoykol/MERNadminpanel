module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
    categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  });
};


