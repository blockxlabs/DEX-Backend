export default (sequelize, DataTypes) => {
  const CoinOrderType = sequelize.define('coinOrderType', {
    type: DataType.STRING,
  });

  return CoinOrder;
};
