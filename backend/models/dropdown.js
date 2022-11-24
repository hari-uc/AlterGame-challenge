'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dropdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dropdown.belongsTo(models.Questions, {
        foreignKey: 'questionId',
        as: 'question',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

      Dropdown.hasMany(models.Users_answers, {
        foreignKey: 'questionId',
        as: 'users_answers',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });

    }
  }
  Dropdown.init({
    dropdownId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    dropdown: {
      type: DataTypes.TEXT,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull:false
    },

    questionId: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Dropdown',
  });
  return Dropdown;
};