const nedb = require('nedb')
const { resolve } = require("path");

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
    console.log("Added Site data")
    this.db.insert({
      menuName: "Dinner",
          category: [
            {
              catName: "Starters",
              dishes: [
                {
                  name: "Lentil soup",
                  price: 6.99,
                  description: "Soup of the day",
                  vegetarian: true,
                  glutenFree: false,
                  available: true,
                },
                {
                  name: "Pate",
                  price: 5.99,
                  description: "Chicken Pate",
                  vegetarian: false,
                  glutenFree: true,
                  available: true,
                },
              ],
            },
            {
              catName: "Mains",
              dishes: [
                {
                  name: "Pizza",
                  price: 12.99,
                  description: "Traditional Pizza",
                  vegetarian: true,
                  glutenFree: false,
                  available: true,
                },
                {
                  name: "Steak",
                  price: 18.99,
                  description: "Ribeye Steak done to your preference",
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
              catName: "Starters",
              dishes: [
                {
                  name: "Cheese toastie",
                  price: 5.99,
                  description: "Classic cheddar cheese toastie",
                  vegetarian: true,
                  glutenFree: false,
                  available: true,
                },
                {
                  name: "Tomato soup",
                  price: 5.99,
                  description: "Cream of Tomato Soup",
                  vegetarian: true,
                  glutenFree: true,
                  available: true,
                },
              ],
            },
            {
              catName: "Mains",
              dishes: [
                {
                  name: "Burger",
                  price: 8.99,
                  description: "With lettuce, tomato and onions",
                  vegetarian: false,
                  glutenFree: false,
                  available: true,
                },
                {
                  name: "Pasta",
                  price: 7.99,
                  description: "With cheese sauce",
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
          console.log("function all() returns: ", JSON.stringify(menus, null , 2));
        }
      });
    });
  }

  getMenu(menu) {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({menuName: menu}, function (err, menus) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(menus);
          //to see what the returned data looks like
          console.log("function edit Menu() returns: ", JSON.stringify(menus, null , 2));
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
        console.log("Error inserting menu", subject);
      } else {
        console.log("Menu inserted into the database", doc);
      }
    });
  }

  editMenu(oldMenuName,newMenuName) {
    console.log(oldMenuName)
    console.log(newMenuName)
    this.db.update({menuName: oldMenuName},{$set:{'menuName':newMenuName}}, function (err, doc) {
      if (err) {
        console.log("Error updating menu", subject);
      } else {
        console.log("Menu updated inside the database", doc);
      }
    });
  }

  deleteMenu(MenuName) {
    console.log(MenuName)
    this.db.remove({menuName: MenuName},{multi: true}, function (err, doc) {
      if (err) {
        console.log("Error removing menu", subject);
      } else {
        console.log("Menu removed from the database", doc);
      }
    });
  }



  getCat(menu, Cat) {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({menuName: menu, "category.catName": Cat},{'menuName': 1, 'category.catName': 1}, function (err, menus) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(menus);
          //to see what the returned data looks like
          console.log("function edit Cat() returns: ", JSON.stringify(menus, null , 2));
        }
      });
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

  editCat(MenuName, oldCatName, newCatName, catIndex) {
    console.log(MenuName)
    console.log(oldCatName)
    console.log(newCatName)

    var index = parseInt(catIndex, 10)
    console.log(index)

    this.db.update({menuName: MenuName},{$set:{[`category.${index}.catName`]: newCatName}}, function (err, doc) {
      if (err) {
        console.log("Error updating menu", subject);
      } else {
        console.log("Menu updated inside the database", doc);
      }
    });
  }

  deleteCat(MenuNameTarget, CatNameTarget) {
    console.log(MenuNameTarget)
    console.log(CatNameTarget)

    this.db.update({ menuName: MenuNameTarget },{ $pull: { category: { catName: CatNameTarget } } }, function (err, doc) {
      if (err) {
        console.log("Error updating menu", subject);
      } else {
        console.log("Menu updated inside the database", doc);
      }
    });
  }




  addDish(selectMenuName, dishCatName, dishName, dishPrice, dishDescription ,dishVegetarian, dishGlutenFree, dishAvailable, arrayIndex) {
    console.log(selectMenuName)
    console.log(dishCatName)
    var entry = {
      name: dishName,
      price: dishPrice,
      description: dishDescription,
      vegetarian: dishVegetarian,
      glutenFree: dishGlutenFree,
      available: dishAvailable,
    };
    console.log("entry created", entry);

    var index = parseInt(arrayIndex, 10)
    console.log(index)

    this.db.update({menuName: selectMenuName, 'category.catName': dishCatName}, {$addToSet: {[`category.${index}.dishes`]: entry}}, {upsert: true},  function (err, doc) {
      if (err) {
        console.log("Error inserting document", subject);
      } else {
        console.log("document inserted into the database", doc);
      }
    });
  }

  addDishAllergic(selectMenuName, dishCatName, dishName, dishPrice, dishDescription ,dishVegetarian, dishGlutenFree, dishAvailable, arrayIndex, dishAllergies) {
    console.log(selectMenuName)
    console.log(dishCatName)
    var entry = {
      name: dishName,
      price: dishPrice,
      description: dishDescription,
      allergies: dishAllergies,
      vegetarian: dishVegetarian,
      glutenFree: dishGlutenFree,
      available: dishAvailable,
    };
    console.log("entry created", entry);

    var index = parseInt(arrayIndex, 10)
    console.log(index)

    this.db.update({menuName: selectMenuName, 'category.catName': dishCatName}, {$addToSet: {[`category.${index}.dishes`]: entry}}, {upsert: true},  function (err, doc) {
      if (err) {
        console.log("Error inserting document", subject);
      } else {
        console.log("document inserted into the database", doc);
      }
    });
  }

  editDish(selectMenuName, dishCatName, dishName, dishPrice, dishDescription,dishVegetarian, dishGlutenFree, dishAvailable, catIndex ,arrayIndex) {
    console.log(selectMenuName)
    console.log(dishCatName)

    var entry = {
      name: dishName,
      price: dishPrice,
      description: dishDescription,
      vegetarian: dishVegetarian,
      glutenFree: dishGlutenFree,
      available: dishAvailable,
    };
    console.log("entry created", entry);

    var index = parseInt(catIndex, 10)
    console.log(index)

    var index2 = parseInt(arrayIndex, 10)
    console.log(index2)


    this.db.update({menuName: selectMenuName}, {$set: {[`category.${index}.dishes.${index2}`]: entry}},  function (err, doc) {
      if (err) {
        console.log("Error inserting document", subject);
      } else {
        console.log("document inserted into the database", doc);
      }
    });
  }

  editDishAllergies(selectMenuName, dishCatName, dishName, dishPrice, dishDescription,dishVegetarian, dishGlutenFree, dishAvailable, catIndex ,arrayIndex, dishAllergies) {
    console.log(selectMenuName)
    console.log(dishCatName)

    var entry = {
      name: dishName,
      price: dishPrice,
      description: dishDescription,
      allergies: dishAllergies,
      vegetarian: dishVegetarian,
      glutenFree: dishGlutenFree,
      available: dishAvailable,
    };
    console.log("entry created", entry);

    var index = parseInt(catIndex, 10)
    console.log(index)

    var index2 = parseInt(arrayIndex, 10)
    console.log(index2)


    this.db.update({menuName: selectMenuName}, {$set: {[`category.${index}.dishes.${index2}`]: entry}},  function (err, doc) {
      if (err) {
        console.log("Error inserting document", subject);
      } else {
        console.log("document inserted into the database", doc);
      }
    });
  }

  deleteDish(MenuNameTarget, targetName, arrayIndex,) {

    var index = parseInt(arrayIndex, 10)
    console.log(index)

    this.db.update({ menuName: MenuNameTarget },{ $pull: {[`category.${index}.dishes`]: {name: targetName } } }, function (err, doc) {
      if (err) {
        console.log("Error updating menu", subject);
      } else {
        console.log("Menu updated inside the database", doc);
      }
    });
  }

  //End of class
}

module.exports = Restaurant;
