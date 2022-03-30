const express = require("express");
const router = express.Router();
const controller = require('../controllers/guestbookController.js');
const {login} = require('../auth/auth')
const {verify} = require('../auth/auth')

router.get("/", controller.landing_page);

router.get('/about', controller.about);

router.get('/aboutAdmin', controller.aboutAdmin);

router.get('/menu/:menu', controller.show_user_entries);

//For new pages
router.get('/new',verify, controller.show_new_entries)
router.post('/new',verify, controller.post_new_entry);

//show register page
router.get('/register', controller.show_register_page);

router.post('/register', controller.post_new_user);

router.get("/admin",verify, controller.admin_page);
//show login page
router.get('/login', controller.show_login_page);

router.post('/login', login, controller.handle_login);

router.get("/loggedIn",verify, controller.loggedIn_landing);

router.get("/logout", controller.logout);




//ALWAYS KEEP LAST ROUTE
router.get('*', controller.not_found);

router.use(function (err, req, res, next) {
  res.status(500);
  res.type("text/plain");
  res.send("Internal Server Error.");
});

module.exports = router;
