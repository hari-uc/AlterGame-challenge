'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users_answers', {
      users_answer_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.TEXT
      },
      surveyId: {
        type: Sequelize.TEXT
      },
      optionId: {
        type: Sequelize.TEXT
      },
      dropdownId: {
        type: Sequelize.TEXT
      },
      questionId: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Users_answers');
  }
};