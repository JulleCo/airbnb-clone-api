'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Places extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Places.belongsTo(models.City, {
        foreignKey: {
          name: 'idCity',
        },
      }),
      models.Places.belongsTo(models.User, {
        foreignKey: {
          name: 'idUser',
        },
      })

    }
  };
  Places.init({
    idCity: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    rooms: DataTypes.INTEGER,
    bathrooms: DataTypes.INTEGER,
    maxGuests: DataTypes.INTEGER,
    priceByNight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Places',
  });
  return Places;
};