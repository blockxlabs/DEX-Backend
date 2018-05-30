export default (sequelize, DataTypes) => {
  const Stock = sequelize.define('stock', {
    quantityRemaining: {
      type: DataTypes.INTEGER,
    },
  });

  // Add Associations

  return Stock;
};
