'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_answers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Users_answers.belongsTo(models.Survey, {
        foreignKey: 'surveyId',
        as: 'survey',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Users_answers.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Users_answers.belongsTo(models.Questions, {
        foreignKey: 'questionId',
        as: 'question',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Users_answers.belongsTo(models.Options, {
        foreignKey: 'optionId',
        as: 'option',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Users_answers.belongsTo(models.Dropdown, {
        foreignKey: 'dropdownId',
        as: 'dropdown',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

    }
  }
  Users_answers.init({
    users_answer_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    optionId: DataTypes.TEXT,
    surveyId: DataTypes.TEXT,
    dropdownId: DataTypes.TEXT,
    questionId: DataTypes.TEXT,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users_answers',
  });
  return Users_answers;
};