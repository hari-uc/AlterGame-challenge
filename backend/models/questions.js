'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questions.hasMany(models.Options, {
        foreignKey: 'questionId',
        as: 'options',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Questions.belongsTo(models.Survey, {
        foreignKey: 'surveyId',
        as: 'survey',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Questions.hasMany(models.Dropdown, {
        foreignKey: 'questionId',
        as: 'dropdown',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
        });

      Questions.hasMany(models.Users_answers, {
        foreignKey: 'questionId',
        as: 'users_answers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      

  
    }
  }
  Questions.init({
    questionId:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    surveyId: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    question_type: {
      type: DataTypes.STRING,
      allowNull:false
    },
    question: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull:false
    },

  }, {
    sequelize,
    modelName: 'Questions',
  });
  return Questions;
};