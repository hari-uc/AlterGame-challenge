'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Options.belongsTo(models.Questions, {
        foreignKey: 'questionId',
        as: 'question',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Options.hasMany(models.Users_answers, {

        foreignKey: 'optionId',
        as: 'users_answers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      
    }
  }
  Options.init({
    optionID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    questionId: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    surveyId: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    option: {
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
    modelName: 'Options',
  });
  return Options;
};