module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Brand", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false  // 🚫 disables createdAt and updatedAt
  });
};
