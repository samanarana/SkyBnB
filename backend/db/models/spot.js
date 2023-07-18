'use strict';

const moment = require('moment');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'ownerId', as: 'Owner' });
      this.hasMany(models.SpotImage, { foreignKey: 'spotId', as: 'SpotImages', onDelete: 'CASCADE', hooks: true });
      this.hasMany(models.Review, { foreignKey: 'spotId', as: 'reviews', onDelete: 'CASCADE', hooks: true });
      this.hasMany(models.Booking, { foreignKey: 'spotId', as: 'bookings', onDelete: 'CASCADE', hooks: true });
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ownerId: {
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
    lat: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true,
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      validate: {
        isDecimal: true,
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      }
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      get() {
        return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    // numReviews: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   defaultValue: 0
    // },
    avgRating: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
      get() {
        const value = this.getDataValue('avgRating');
        return value ? parseFloat(value.toFixed(1)) : 0;
      },
      validate: {
        min: 0,
        max: 5,
      },
    },
    previewImage:{
      type: DataTypes.STRING,
    get() {
      const value = this.getDataValue('previewImage');
      return value?value:"image url";
    },
  }
},
  {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
