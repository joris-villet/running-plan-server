const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://badjojo-mongodb:badjojo-al23002y@training-map.hiaam.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  module.exports = db;


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