'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Spot, { foreignKey: 'spot_id', as: 'spot' });
    }
  }
  SpotImage.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    spot_id: DataTypes.INTEGER,
    url: DataTypes.STRING,
    preview: DataTypes.BOOLEAN,
    avgStarRating: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0,
        max: 5,
      },
    }

  }, {
    sequelize,
    modelName: 'SpotImage',
  });
  return SpotImage;
};
