export default (sequelize, DataTypes) => {
  const CoinOrder = sequelize.define('coinOrder', {
    quantity: DataTypes.STRING,
    price: DataTypes.DECIMAL,
  });

  CoinOrder.associate = models => {
    models.CoinOrder.belongsTo(models.User);
    models.CoinOrder.belongsTo(models.Product);
    models.CoinOrder.belongsTo(models.CoinOrderType);
  };

  return CoinOrder;
};
