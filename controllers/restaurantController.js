const restaurantDAO = require("../models/restaurantModel.js");
const userDao = require("../models/userModel.js");
const db = new restaurantDAO();
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
  res.render("errors/404");
};

exports.server_error = function (req, res) {
  res.render("errors/500");
};

exports.landing_page = function (req, res) {
  db.getAllMenus()
    .then((list) => {
      res.render("index", {
        title: "Restaurant webApp",
        entries: list,
        home: "active",
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
        title: "Restaurant webApp",
        home: "active",
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
        admin: "active",
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
  db.getAllMenus().then(list => { 
  db.getMenusByName(menu)
    .then((menuList) => {
      res.render("menu", {
        title: menu,
        menu: "active",
        user: "user",
        menus: menuList,
        entries: list
      });
    })
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

exports.show_user_entries = function (req, res) {
  let menu = req.params.name;
  db.getAllMenus().then(list => { 
  db.getMenusByName(menu)
    .then((menuList) => {
      res.render("menu", {
        title: menu,
        menu: "active",
        menus: menuList,
        entries: list
      });
    })
    })
    .catch((err) => {
      console.log("Error: ");
      console.log(JSON.stringify(err));
    });
};

exports.post_new_entry = function (req, res) {
  console.log("processing post-new_entry controller");
  if (!req.body.dishName) {
    response.status(400).send("entries must have an dishName.");
    return;
  }
  if (req.body.dishAllergies != ''){
    db.addEntry(req.body.dishName, req.body.dishPrice, req.body.dishCategory, req.body.dishAllergies, req.body.vegetarian, req.body.glutenFree, req.body.menuName, req.body.available, req.body.dishAllergies);
  }else{
    db.addEntry(req.body.dishName, req.body.dishPrice, req.body.dishCategory, req.body.dishAllergies, req.body.vegetarian, req.body.glutenFree, req.body.menuName, req.body.available );
  }
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
  db.getAllMenus()
  .then((list) => {
    res.render("user/login", {
      title: "Restaurant webApp",
      home: "active",
      entries: list,
    });
  });
};

exports.handle_login = function (req, res) {
  res.redirect("/admin");
};

exports.logout = function (req, res) {
  res.clearCookie("jwt").status(200).redirect("/");
  console.log("Test");
};

exports.show_new_menu = function (req, res) {
  db.getAllMenus()
    .then((list) => {
      res.render("new/newMenu", {
        title: "Restaurant webApp",
        entries: list,
        user: "user",
        admin: "active",
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.post_new_menu = function (req, res) {
  console.log(req.body.newMenuName)
  console.log("processing post-new_menu controller");
  if (!req.body.newMenuName) {
    response.status(400).send("menus must have a name!.");
    return;
  }
  db.addMenu(req.body.newMenuName);
  res.redirect("/admin");
};

exports.show_edit_menu = function (req, res) {
  menu = req.params.name
  db.getMenu(menu)
    .then((list) => {
      res.render("edit/editMenu", {
        title: "Restaurant webApp",
        entries: list,
        user: "user",
        admin: "active",
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.post_edit_menu = function (req, res) {
  console.log(req.body.oldMenuName, req.body.newMenuName)
  console.log("processing post-edit_menu controller");
  if (!req.body.newMenuName) {
    response.status(400).send("menus must have a name!.");
    return;
  }
  db.editMenu(req.body.oldMenuName, req.body.newMenuName);
  res.redirect("/admin");
};

exports.show_delete_menu = function (req, res) {
  menu = req.params.name
  db.getMenu(menu)
    .then((list) => {
      res.render("delete/deleteMenu", {
        title: "Restaurant webApp",
        entries: list,
        user: "user",
        admin: "active",
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.post_delete_menu = function (req, res) {
  console.log(req.body.MenuName)
  console.log("processing post-delete_menu controller");
  if (!req.body.MenuName) {
    response.status(400).send("menus must have a name!.");
    return;
  }
  db.deleteMenu(req.body.MenuName);
  res.redirect("/admin");
};

exports.show_new_cat = function (req, res) {
  db.getAllMenus()
    .then((list) => {
      res.render("new/newCat", {
        title: "Restaurant webApp",
        entries: list,
        user: "user",
        admin: "active",
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};



exports.post_new_cat = function (req, res) {
  console.log(req.body.menuName, req.body.newCatName)
  console.log("processing post-new_cat controller");
  if (!req.body.newCatName) {
    response.status(400).send("Category must have a name!.");
    return;
  }
  db.addCat(req.body.menuName, req.body.newCatName);
  res.redirect("/admin");
};

exports.show_edit_cat = function (req, res) {
  menu = req.params.menu
  cat = req.params.cat

  console.log(menu)
  console.log(cat)
  db.getMenu(menu)
    .then((list) => {
      res.render("edit/editCat", {
        title: "Restaurant webApp",
        entries: list,
        user: "user",
        admin: "active",
        catMenu: menu,
        selectCatName: cat,
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.post_edit_cat = function (req, res) {
  console.log(req.body.CatMenu, req.body.oldCatName, req.body.newCatName, req.body.catIndex)
  console.log("processing post-edit_cat controller");
  if (!req.body.newCatName) {
    response.status(400).send("menus must have a name!.");
    return;
  }
  db.editCat(req.body.CatMenu, req.body.oldCatName, req.body.newCatName, req.body.catIndex);
  res.redirect("/admin");
};

exports.show_delete_cat = function (req, res) {
  menu = req.params.menu
  cat = req.params.cat

  console.log(menu)
  console.log(cat)
  db.getMenu(menu)
    .then((list) => {
      res.render("delete/deleteCat", {
        title: "Restaurant webApp",
        entries: list,
        user: "user",
        admin: "active",
        catMenu: menu,
        selectCatName: cat,
      });
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.post_delete_cat = function (req, res) {
  console.log(req.body.CatMenu, req.body.CatName, req.body.catIndex);
  console.log("processing post-delete_menu controller");
  db.deleteCat(req.body.CatMenu, req.body.CatName);
  res.redirect("/admin");
};



exports.show_new_dish = function (req, res) {
  db.getAllMenus()
    .then((list) => {
      res.render("new/newDish", {
        title: "Restaurant webApp",
        entries: list,
        user: "user",
        admin: "active",
      });
      console.log("promise resolved");
    })
    .catch((err) => {
      console.log("promise rejected", err);
    });
};

exports.post_new_dish = function (req, res) {
  console.log(req.body.selectMenuName, req.body.dishCategory)
  console.log("processing post-new_dish controller");
  if (!req.body.dishCategory) {
    response.status(400).send("Category must have a name!.");
    return;
  }
  if(req.body.dishAllergies != ''){
    db.addDishAllergic(req.body.selectMenuName, req.body.dishCategory, req.body.dishName, req.body.dishPrice, req.body.dishDescription, req.body.vegetarian, req.body.glutenFree, req.body.available, req.body.arrayIndex, req.body.dishAllergies);
  }else{
    db.addDish(req.body.selectMenuName, req.body.dishCategory, req.body.dishName, req.body.dishPrice, req.body.dishDescription, req.body.vegetarian, req.body.glutenFree, req.body.available, req.body.arrayIndex);
  }
  res.redirect("/admin");
};

exports.show_edit_dish = function (req, res) {
  menu = req.params.menu
  cat = req.params.cat
  dish = req.params.dish

  console.log(menu)
  console.log(cat)
  console.log(dish)

  db.getMenu(menu)
  .then((list) => {
    res.render("edit/editDish", {
      title: "Restaurant webApp",
      entries: list,
      user: "user",
      admin: "active",
      dishMenu: menu,
      dishCatName: cat,
      selectDish: dish,
    });
    console.log("promise resolved");
  })
  .catch((err) => {
    console.log("promise rejected", err);
  });
};

exports.post_edit_dish = function (req, res) {
  console.log(req.body.selectMenuName, req.body.dishCategory, req.body.dishName, req.body.dishPrice, req.body.dishDescription, req.body.vegetarian, req.body.glutenFree, req.body.available, req.body.catIndex, req.body.dishIndex)
  console.log("processing post-edit_menu controller");
  if (!req.body.dishName) {
    response.status(400).send("menus must have a name!.");
    return;
  }
  if(req.body.dishAllergies != ''){
    db.editDishAllergies(req.body.selectMenuName, req.body.dishCategory, req.body.dishName, req.body.dishPrice, req.body.dishDescription,req.body.vegetarian, req.body.glutenFree, req.body.available, req.body.catIndex, req.body.dishIndex, req.body.dishAllergies);
  }else{
  db.editDish(req.body.selectMenuName, req.body.dishCategory, req.body.dishName, req.body.dishPrice, req.body.dishDescription,req.body.vegetarian, req.body.glutenFree, req.body.available, req.body.catIndex, req.body.dishIndex);
  }
  res.redirect("/admin");
};

exports.show_delete_dish = function (req, res) {
  menu = req.params.menu
  cat = req.params.cat
  dish = req.params.dish

  console.log(menu)
  console.log(cat)
  console.log(dish)

  db.getMenu(menu)
  .then((list) => {
    res.render("delete/deleteDish", {
      title: "Restaurant webApp",
      entries: list,
      user: "user",
      admin: "active",
      dishMenu: menu,
      dishCatName: cat,
      selectDish: dish,
    });
    console.log("promise resolved");
  })
  .catch((err) => {
    console.log("promise rejected", err);
    });
};

exports.post_delete_dish = function (req, res) {
  console.log(req.body.selectMenuName, req.body.dishName, req.body.catIndex)
  console.log("processing post-delete_menu controller");
  db.deleteDish(req.body.selectMenuName, req.body.dishName, req.body.catIndex);
  res.redirect("/admin");
};
