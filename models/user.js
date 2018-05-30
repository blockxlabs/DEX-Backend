export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
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
