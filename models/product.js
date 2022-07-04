'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    sourceUrl: DataTypes.STRING,
    coupon: DataTypes.STRING,
    images: DataTypes.TEXT,
    price: DataTypes.STRING,
    rating: DataTypes.STRING,
    title: DataTypes.STRING,
    orderCount: DataTypes.STRING,
    posted: DataTypes.BOOLEAN,
    affiliateUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};