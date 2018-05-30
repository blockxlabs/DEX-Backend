export default (sequelize, DataTypes) => {
  const CoinOrderType = sequelize.define('coinOrderType', {
    type: DataTypes.STRING,
  });

  return CoinOrderType;
};
