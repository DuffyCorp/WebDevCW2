const express = require("express");
const router = express.Router();
const controller = require('../controllers/restaurantController.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

//Show index page
router.get("/", controller.landing_page);

router.get('/about', controller.about);

router.get('/aboutAdmin', controller.aboutAdmin);



//Show Menus
router.get('/menu/:name', controller.show_user_entries);
router.get('/menu/admin/:name',verify, controller.logged_show_user_entries);



//For new Menus
router.get('/newMenu',verify, controller.show_new_menu)
router.post('/newMenu',verify, controller.post_new_menu);

//For edit Menus
router.get('/editMenu/:name',verify, controller.show_edit_menu)
router.post('/editMenu/:name',verify, controller.post_edit_menu);

//For delete Menus
router.get('/deleteMenu/:name',verify, controller.show_delete_menu)
router.post('/deleteMenu/:name',verify, controller.post_delete_menu);



//For new category's
router.get('/newCat',verify, controller.show_new_cat)
router.post('/newCat',verify, controller.post_new_cat);

//For edit category's
router.get('/editCat/:menu/:cat',verify, controller.show_edit_cat);
router.post('/editCat/:menu/:cat',verify, controller.post_edit_cat);

//For delete category's
router.get('/deleteCat/:menu/:cat',verify, controller.show_delete_cat)
router.post('/deleteCat/:menu/:cat',verify, controller.post_delete_cat);



//For new Dishes
router.get('/newDish',verify, controller.show_new_dish)
router.post('/newDish',verify, controller.post_new_dish);

//For edit Dishes
router.get('/editDish/:name',verify, controller.show_edit_dish)
router.post('/editDish/:name',verify, controller.post_edit_dish);

//For delete Dishes
router.get('/deleteDish/:name',verify, controller.show_delete_dish)
router.post('/deleteDish/:name',verify, controller.post_delete_dish);



//show register page
router.get('/admin/register',verify, controller.show_register_page);
router.post('/admin/register',verify, controller.post_new_user);

//show admin page
router.get("/admin",verify, controller.admin_page);

//show login page
router.get('/login', controller.show_login_page);
router.post('/login', login, controller.handle_login);

//show Logged in landing page
router.get("/loggedIn",verify, controller.loggedIn_landing);

//handle logout request
router.get("/logout", controller.logout);





//ALWAYS KEEP LAST ROUTE
router.get('*', controller.not_found);

router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal Server Error.");
});

module.exports = router;
