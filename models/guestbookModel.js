const nedb = require("nedb");

class GuestBook {
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
      dishName: "Pizza",
      dishPrice: 12.99,
      dishCategory: "Mains",
      dishAllergies: "Nuts",
      vegetarian: "No",
      glutenFree: "No",
      menu: "Dinner",
      available: "yes",
    });
    //for later debugging
    console.log("db entry Pizza inserted");
    this.db.insert({
      dishName: "Lentil soup",
      dishPrice: 6.99,
      dishCategory: "Starters",
      vegetarian: "Yes",
      glutenFree: "Yes",
      menu: "Lunch",
      available: "yes",
    });
    //for later debugging
    console.log("db entry Lentil Soup inserted");
    this.db.insert({
      dishName: "Steak",
      dishPrice: 24.99,
      dishCategory: "Main",
      vegetarian: "No",
      glutenFree: "Yes",
      menu: "Dinner",
      available: "yes",
    });
    //for later debugging
    console.log("db entry Steak inserted");
    this.db.insert({
      dishName: "Steak Pie",
      dishPrice: 8.99,
      dishCategory: "Main",
      vegetarian: "No",
      glutenFree: "No",
      menu: "Lunch",
      available: "yes",
    });
    //for later debugging
    console.log("db entry Steak Pie inserted");
  }

  //a function to return all entries from the database
  getAllentries() {
    //return a Promise object, which can be resolved or rejected
    return new Promise((resolve, reject) => {
      //use the find() function of the database to get the data,
      //error first callback function, err for error, entries for data
      this.db.find({}, function (err, entries) {
        //if error occurs reject Promise
        if (err) {
          reject(err);
          //if no error resolve the promise & return the data
        } else {
          resolve(entries);
          //to see what the returned data looks like
          console.log("function all() returns: ", entries);
        }
      });
    });
  }

  getEntriesByUser(menuName) {
    return new Promise((resolve, reject) => {
        this.db.find({ 'menu': menuName }, function(err, entries) {
        if (err) {
            reject(err);
        } else {
            resolve(entries);
        console.log('getEntriesByUser returns: ', entries);
    }
})
})
}

  addEntry(author, subject, contents) {
    var entry = {
      author: author,
      subject: subject,
      contents: contents,
      published: new Date().toISOString().split("T")[0],
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

  //End of class
}

module.exports = GuestBook;
