
const { DataTypes, Model } = require('sequelize');
const db = require('../db.js');
const dayjs = require('dayjs');
const fr = require('dayjs/locale/fr.js') 
dayjs.locale(fr)

class User extends Model {}

User.init({
  email: {
    type: DataTypes.TEXT
  },
  password: {
    type: DataTypes.TEXT
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      const date = this.getDataValue('createdAt');
      return dayjs(date).format('DD MMMM YYYY à HH:mm');
    }
  },
  updatedAt: {
    type: DataTypes.DATE,
    get() {
      const date = this.getDataValue('updatedAt');
      return dayjs(date).format('DD MMMM YYYY à HH:mm');
    }
  },
}, {
  sequelize: db,
  tableName: "api_user",
  underscored: true
});


module.exports = User;