'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Survey.hasMany(models.Questions, {
        foreignKey: 'surveyId',
        as: 'questions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Survey.init({
    surveyId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    surveyName: {
      type: DataTypes.TEXT,
    },
    survey_credit: {
      type: DataTypes.INTEGER,
    },
    userId:{
      type: DataTypes.TEXT,
      allowNull:false,
    },
    is_active : {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull:false
    }
    
  }, {
    sequelize,
    modelName: 'Survey',
  });
  return Survey;
};