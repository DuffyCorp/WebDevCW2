const Datastore = require("nedb");
const bcrypt = require("bcrypt");
const saltRounds = 10;
class UserDAO {
  constructor(dbFilePath) {
    if (dbFilePath) {
      //embedded
      this.db = new Datastore({ filename: dbFilePath, autoload: true });
    } else {
      //in memory
      this.db = new Datastore();
    }
  }
  // for the demo the password is the bcrypt of the user name
  init() {
    this.db.insert({
      user: "Jack",
      password: "$2b$10$/HgViFVL/FyZKWyVOan3JeOhzYu45ldrFuwYYwUh59IdZIfkw7kru",
    });
    this.create("admin","admin")
    return this;
  }
  create(username, password) {
    const that = this;
    bcrypt.hash(password, saltRounds).then(function (hash) {
      var entry = {
        user: username,
        password: hash,
      };
      that.db.insert(entry, function (err) {
        if (err) {
          console.log("Can't insert user: ", username);
        }
      });
    });
  }

  lookup(user, cb) {
    this.db.find({ user: user }, function (err, entries) {
      if (err) {
        return cb(null, null);
      } else {
        if (entries.length == 0) {
          return cb(null, null);
        }
        return cb(null, entries[0]);
      }
    });
  }

  getAllStaff() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({}, function (err, staff) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(staff);
          //to see what the returned data looks like
          console.log("function all() returns: ", JSON.stringify(staff, null , 2));
        }
      });
    });
  }

  getStaffMember(username){
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({user: username}, function (err, staff) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(staff);
          //to see what the returned data looks like
          console.log("function getStaffMember() returns: ", JSON.stringify(staff, null , 2));
        }
      });
    });
  }

  editStaff(Username, newUserPassword){
    const that = this;
    console.log(Username)
    console.log(newUserPassword)
    bcrypt.hash(newUserPassword, saltRounds).then(function (hash) {
      that.db.update({user: Username},{$set:{'password':hash}}, function (err, doc) {
        if (err) {
          console.log("Error updating user", subject);
        } else {
          console.log("User updated inside the database", doc);
        }
      });
    });
  }

  deleteStaff(Username){
    console.log(Username)
    this.db.remove({user: Username}, function (err, doc) {
      if (err) {
        console.log("Error removing user", subject);
      } else {
        console.log("User removed from the database", doc);
      }
    });
  }
}
const dao = new UserDAO();
dao.init();
module.exports = dao;
