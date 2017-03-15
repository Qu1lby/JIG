/* Handles the routing queries */
module.exports = function(app, database, io, passport, pass_hash, router) {

  /** **Home page** */
  router.get('/', function(req, res, next) {

    /* Classement des groupes */
    database.executeQuery("SELECT id_groupe, nom, img, sum(points) as pts FROM `groupes`, `points` " +
    "WHERE points.id_groupe = groupes.id GROUP BY id_groupe ORDER BY pts DESC LIMIT 13",
      function(res_points) {
        database.executeQuery("SELECT libelle, date, id_event, id_groupe, id_groupe_pari,  SUM(points) as points, g1.nom as nom_parieur, g1.img as img_parieur, g2.nom as nom_pari, g2.img as img_pari " +
        " FROM `evenements`, `pari`, `groupes` as g1,`groupes` as g2  WHERE evenements.id = pari.id_event AND g1.id = pari.id_groupe AND g2.id = pari.id_groupe_pari AND evenements.date = (SELECT MAX(date) FROM evenements) GROUP BY id_groupe_pari ORDER BY points DESC",
          function(res_pari) {
            var arg = [];
            arg['classement'] = res_points;
            arg['pari'] = res_pari;
            giveRender(req, res, 'index.ejs', '', arg);
          });
      });
  });

  /** **Log-in page for admins** */
  router.get('/login', function(req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/admin');
    } else {
      var arg = [];

      if (req.query.error != undefined)
        if (req.query.error == "authentification")
          arg['error'] = "Echec d'authentification";

      giveRender(req, res, 'login.ejs', 'Home - Administrateur', arg);
    }
  });

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/login?error=authentification',
  }));

  /** **Log-out** */
  router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.redirect('/login');
  });

  /** **Administrator Panel** */
  router.get('/admin', ensureAuthenticated, function(req, res, next) {
    database.executeQuery("SELECT * FROM commentaire ORDER BY date DESC", function(res_commentaire) {
      var arg = [];
      arg['commentaire'] = res_commentaire;
      database.executeQuery("SELECT * FROM pari ORDER BY id_event DESC", function(res_pari) {
        arg['pari'] = res_pari;
        database.executeQuery("SELECT * FROM points ORDER BY date DESC", function(res_points) {
          arg['points'] = res_points;
          database.executeQuery("SELECT id,nom FROM groupes", function(res_groupes) {
            arg['groupes'] = res_groupes;
            giveRender(req, res, 'admin.ejs', 'Home - Administrateur', arg);
          });
        });
      });
    });
  });




  /** **Trolls** */
  app.get('/chirac', function(req, res, next) {
    giveRender(req, res, 'chirac.ejs', 'Chirac Approved');
  });

  app.get('/bojeu', function(req, res, next) {
    giveRender(req, res, 'bojeu.ejs', 'Bojeu Mobile');
  });

  /** **Redirection on this specific error** */
  app.get('/css', function(req, res, next) {
    res.redirect('/404');
  });

  /** **Redirection on this specific error** */
  app.get('/img', function(req, res, next) {
    res.redirect('/404');
  });

  /** **Redirection on this specific error** */
  app.get('/js', function(req, res, next) {
    res.redirect('/404');
  });

  /** **Redirection for 404 errors** */
  app.use('*', function(req, res, next) {
    res.redirect('/');
  });

  /** **Take informations and build the view** */
  function giveRender(req, res, page, title, compl_render) {
    var render = [];
    render['title'] = title;

    /* Add all extra informations */
    for (val in compl_render)
      render[val] = compl_render[val];

    res.render(page, {
      arg: render
    });
  }

  /** **Ensure admin is log-in** */
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else res.redirect('/login');
  }
};
