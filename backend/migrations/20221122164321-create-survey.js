'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Surveys', {
      surveyId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull:false,
        primaryKey: true
      },
      surveyName: {
        type: Sequelize.TEXT
      },
      survey_credit: {
        type: Sequelize.INTEGER
      },
      userId:{
        type: Sequelize.TEXT,
        allowNull:false,
        
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull:false
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
    await queryInterface.dropTable('Surveys');
  }
};