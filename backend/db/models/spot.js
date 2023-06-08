'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' });
      this.hasMany(models.SpotImage, { foreignKey: 'spot_id', as: 'images' });
      this.hasMany(models.Review, { foreignKey: 'spot_id', as: 'reviews' });
      this.hasMany(models.Booking, { foreignKey: 'spot_id', as: 'bookings' });
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    avg_rating: {
      type: DataTypes.DECIMAL,
      validate: {
        min: 0,
        max: 5,
      },
    },
    preview_image: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
