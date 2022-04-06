const nedb = require("nedb");

class Restaurant {
  constructor(dbFilePath) {
    if (dbFilePath) {
      this.db = new nedb({ filename: dbFilePath, autoload: true });
      console.log("DB connected to " + dbFilePath);
    } else {
      this.db = new nedb();
    }
  }

  init() {
    this.db.insert({
      menuName: "Dinner",
          category: [
            {
              catName: "Mains",
              dishes: [
                {
                  name: "Pizza",
                  price: 12.99,
                  vegetarian: true,
                  glutenFree: false,
                  available: true,
                },
                {
                  name: "Steak",
                  price: 18.99,
                  vegetarian: false,
                  glutenFree: true,
                  available: true,
                },
              ],
            },
            {
              catName: "Starters",
              dishes: [
                {
                  name: "Lentil soup",
                  price: 6.99,
                  vegetarian: true,
                  glutenFree: false,
                  available: true,
                },
                {
                  name: "Pate",
                  price: 5.99,
                  vegetarian: false,
                  glutenFree: true,
                  available: true,
                },
              ],
            },
          ],
    });
    console.log("Added Dinner Menu")
    this.db.insert({
      menuName: "Lunch",
          category: [
            {
              catName: "Mains",
              dishes: [
                {
                  name: "Burger",
                  price: 8.99,
                  vegetarian: false,
                  glutenFree: false,
                  available: true,
                },
                {
                  name: "Pasta",
                  price: 7.99,
                  vegetarian: true,
                  glutenFree: false,
                  available: true,
                },
              ],
            },
            {
              catName: "Starters",
              dishes: [
                {
                  name: "Cheese toastie",
                  price: 5.99,
                  vegetarian: true,
                  glutenFree: false,
                  available: true,
                },
                {
                  name: "Tomato soup",
                  price: 5.99,
                  vegetarian: true,
                  glutenFree: false,
                  available: true,
                },
              ],
            },
          ],
    });
    console.log("Added Lunch Menu")
  }

  //a function to return all entries from the database
  getAllMenus() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({}, function (err, menus) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(menus);
          //to see what the returned data looks like
          console.log("function all() returns: ", menus);
        }
      });
    });
  }

  getMenusByName(searchName) {
    console.log(searchName)
    return new Promise((resolve, reject) => {
      this.db.find({menuName: searchName }, function (err, menus) {
        if (err) {
          reject(err);
        } else {
          resolve(menus);
          console.log("getMenuByName returns: ", menus);
        }
      });
    });
  }

  addMenu(newMenuName) {
    console.log(newMenuName)
    var entry = {
      menuName: newMenuName,
      category: []
    };
    console.log("entry created", entry);
    this.db.insert(entry, function (err, doc) {
      if (err) {
        console.log("Error inserting document", subject);
      } else {
        console.log("document inserted into the database", doc);
      }
    });
  }

  addCat(selectMenuName, newCatName) {
    console.log(selectMenuName)
    console.log(newCatName)
    var entry = {
      catName: newCatName,
      dishes: []
    };
    console.log("entry created", entry);
    this.db.update({ menuName: selectMenuName }, { $addToSet: { category: entry } }, {},  function (err, doc) {
      if (err) {
        console.log("Error inserting document", subject);
      } else {
        console.log("document inserted into the database", doc);
      }
    });
  }

  addDish(selectMenuName, dishCatName, dishName, dishPrice, dishVegetarian, dishGlutenFree, dishAvailable) {
    console.log(selectMenuName)
    console.log(dishCatName)
    var entry = {
      name: dishName,
      price: dishPrice,
      vegetarian: dishVegetarian,
      glutenFree: dishGlutenFree,
      available: dishAvailable,
    };
    console.log("entry created", entry);
    this.db.update(
      {"menuName": {"$eq": "Lunch"}},
      {"$addToSet": {"category.$[cat].dishes": {"name": "pizza"}}},
      {"arrayFilters": [{"cat.catName": {"$eq": "Mains"}}]},  function (err, doc) {
      if (err) {
        console.log("Error inserting document", subject);
      } else {
        console.log("document inserted into the database", doc);
      }
    });
  }

  //End of class
}

module.exports = Restaurant;
