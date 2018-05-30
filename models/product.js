export default (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: DataTypes.STRING,
    logo: DataTypes.STRING,
    quantity: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.DECIMAL,
    },
  });

  return Product;
};
