
// db.running.insert({
//   firstname: 'joris',
//   lastname: 'villet',
//   email: 'badjojo@hotmail.fr',
//   password: '$2a$09$OasDJqzDMpYGQjHvZe2gdOxainQyFz1kbyNPLEegk1Bcr1LlpYkDa',
//   events: {
//     day_event: '',
//     time: '',
//     training_type: '',
//     weight: '',
//   }
// });


/*----------------------------------------------------------------*/

// const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize(process.env.DATABASE_URL);

// if (process.env.NODE_ENV === 'production') {
//   sequelize.options.logging = false;
// }

// sequelize.authenticate()
//   .then(console.log('Connection to postgres OKAY'))
//   .catch(err => console.log('Connection to postgres NOT OKAY', err))

// module.exports = sequelize;