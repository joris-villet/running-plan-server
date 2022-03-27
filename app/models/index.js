const User = require('./User.js');
const Event = require('./Event.js');

User.hasMany(Event, {
  as: 'events',
  // foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Event.belongsTo(User, {
  as: 'user',
  // foreignKey: 'user_id',
  onDelete: 'CASCADE'
})


module.exports = { User, Event };