export default (sequelize, DataTypes) => {
  const CoinOrder = sequelize.define('coinOrder', {
    quantity: DataTypes.STRING,
    price: DataTypes.DECIMAL,
  });

  

  return CoinOrder;
};
