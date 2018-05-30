export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  });

  User.associate = models => {
    User.hasMany(models.CoinOrder, { as: 'CoinOrders' });
  };

  return User;
};
