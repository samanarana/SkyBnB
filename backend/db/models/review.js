'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Spot, { foreignKey: 'spot_id', as: 'spot' });
      this.hasMany(models.ReviewImage, { foreignKey: 'review_id', as: 'images' });
    }
  }
  Review.init({
    id: DataTypes.INTEGER,
    spot_id: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    stars: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
