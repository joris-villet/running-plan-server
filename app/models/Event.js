const { DataTypes, Model } = require('sequelize');
const db = require('../db.js');
const dayjs = require('dayjs');
const fr = require('dayjs/locale/fr.js') 
dayjs.locale(fr)

class Event extends Model {}

Event.init({
  date: {
    type: DataTypes.DATE,
    get() {
      const date = this.getDataValue('date');
      return dayjs(date).format('DD MMMM YYYY à HH:mm');
    }
  },
  time: {
    type: DataTypes.TEXT
  },
  trainingType: {
    type: DataTypes.TEXT
  },
  weight: {
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize: db,
  tableName: "api_event",
  underscored: true
});


module.exports = Event;