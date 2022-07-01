'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sourceUrl: {
        type: Sequelize.STRING
      },
      coupon: {
        type: Sequelize.STRING
      },
      images: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      orderCount: {
        type: Sequelize.STRING
      },
      posted: {
        type: Sequelize.BOOLEAN
      },
      affiliateUrl: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};