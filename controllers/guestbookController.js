const guestbookDAO = require("../models/guestbookModel.js");
const userDao = require("../models/userModel.js");
const db = new guestbookDAO();
db.init();

exports.about = function (req, res) {
  res.render("about");
};

exports.aboutAdmin = function (req, res) {
  res.render("about", {
    title: "About Page",
    user: "user",
  });
};

exports.not_found = function (req, res) {
  res.render("404");
};

exports.server_error = function (req, res) {
  res.render("500");
};

exports.landing_page = function (req, res) {
  db.getAllMenus()
    .then((list) => {
      res.render("index", {
        title: "Guest Book",
        entries: list,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.loggedIn_landing = function (req, res) {
  db.getAllMenus()
    .then((list) => {
      res.render("index", {
        title: "Guest Book",
        user: "user",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.admin_page = function (req, res) {
  db.getAllMenus()
    .then((list) => {
      res.render("adminPage", {
        title: "Admin Page",
        user: "user",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.logged_show_user_entries = function (req, res) {
  let menu = req.params.name;
  db.getMenusByName(menu)
    .then((list) => {
      res.render("menu", {
        title: menu,
        user: "user",
        entries: list,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

exports.show_user_entries = function (req, res) {
  let menu = req.params.name;
  db.getMenusByName(menu)
    .then((list) => {
      res.render("menu", {
        title: menu,
        entries: list,
      });
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

exports.new_entries = function (req, res) {
  res.render("newEntry", {
    title: "Guest Book",
    user: "user"
  });
};

exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.dishName) {
    response.status(400).send("entries must have an dishName.");
    return;
  }
  db.addEntry(req.body.dishName, req.body.dishPrice, req.body.dishCategory, req.body.dishAllergies, req.body.vegetarian, req.body.glutenFree, req.body.menu, req.body.available );
  res.redirect("/admin");
};

exports.show_register_page = function (req, res) {
  res.render("user/register");
};

exports.post_new_user = function (req, res) {
  const user = req.body.username;
  const password = req.body.pass;
  if (!user || !password) {
    res.send(401, "no user or no password");
    return;
  }
  userDao.lookup(user, function (err, u) {
    if (u) {
      res.send(401, "User exists:", user);
      return;
    }
    userDao.create(user, password);
    console.log("register user", user, "password", password);
    res.redirect("/login");
  });
};

exports.show_login_page = function (req, res) {
  res.render("user/login");
};

exports.handle_login = function (req, res) {
  res.redirect("/admin");
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
  console.log("Test");
};

exports.show_new_entries = function (req, res) {
  res.render("newEntry", {
    title: "Guest Book",
    user: "user",
  });
};
