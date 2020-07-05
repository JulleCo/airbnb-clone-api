'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        defaultValue: Sequelize.literal('NOW()'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        defaultValue: Sequelize.literal('NOW()'),
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cities');
  }
};