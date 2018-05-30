export default (sequelize, DataTypes) => {
  const CoinOrder = sequelize.define('coinOrder', {
    quantity: DataTypes.STRING,
    price: DataTypes.DECIMAL,
  });

  // CoinOrder.associate = models => {
  //   CoinOrder.hasMany(models.CoinOrder, { as: 'CoinOrders' });
  // };

  return CoinOrder;
};
