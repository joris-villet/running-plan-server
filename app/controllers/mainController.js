


module.exports = mainController = {

  homePage: (req, res) => {
    res.render('index', { title: 'Récap training' }
    )
  },

  // loginPage: (req, res) => res.render('loginPage', { title: 'Tuning miniature connexion'}),

  // registerPage: (req, res) => res.render('registerPage', { title: 'Tuning miniature inscription'}),

}

