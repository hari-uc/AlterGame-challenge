'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull:false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true

    },
    password: DataTypes.STRING,
    wallet:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull:false
    }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};