export default (sequelize, DataTypes) => {
  const Stock = sequelize.define('stock', {
    quantityRemaining: {
      type: DataTypes.INTEGER,
    },
  });

  // Add Associations

  Stock.associate = models => {
    Stock.hasOne(models.Product, { as: 'Product_Stock' });
  };
  return Stock;
};
