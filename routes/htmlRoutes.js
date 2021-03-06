var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.user.findOne({
      order: [
        ["id", "DESC"]
      ]
    }).then(function (user) {
      if (user) {
        var data = user.dataValues;
        res.render("index", {
          user: data
        });
      }
      else { res.render("index"); }
    });
  });

  app.get("/survey", function (req, res) {
    db.Recommendation.findAll({
      order: [
        ["StarterId", "DESC"]
      ],
      limit: 4
    }).then(function (recs) {
      var recsArr = [];
      for (i = 0; i < recs.length; i++) {
        recsArr.push(recs[i].recommendation);
      }
      res.render("survey", {
        msg: "FetPinder",
        starter: "Based on the initial survey - the dog breeds most suited for you are: ",
        recs: recsArr
      });
    });
  });



  app.put("/dashbaord", function(req, res) {
    db.user.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Load example page and pass in an example by id
  app.get("/survey/:id", function (req, res) {
    db.Survey.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/starter", function (req, res) {
    res.render("starter", {
      msg: "Fill out your initial survey!"
    });
  });

  //Search History
  app.get("/history", function (req, res) {
    db.Survey.findAll({}).then(function (surveys) {
      res.render("history", {
        msg: "FetPinder",
        surveys: surveys
      });

    });
  });

  app.get("/searchall", function (req, res) {
    res.render("searchall", {
      msg: "Search History"
    });
  });

  app.get("/displayall", function (req, res) {
    res.render("displayall", {
      msg: "Fill out breed and location"
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  app.get("/signin", function (req, res) {
    db.user.findAll({}).then(function (userData) {
      console.log(userData.dataValues);
      res.render("searchall", {
        msg: "Search History",
        userData: userData.dataValues
      });
    });
  });








};
