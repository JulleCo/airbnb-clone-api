'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Places', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Cities',
        //   key: 'id',
        // },
      },
      // idUser: {
      //   type: Sequelize.INTEGER
      // },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      rooms: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bathrooms: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      maxGuests: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      priceByNight: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Places');
  }
};