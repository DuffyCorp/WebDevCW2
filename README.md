# WebDevCW2

## Features

This project includes the following features

1. the ability to add, edit and delete Users
2. the ability to add, edit and delete Menus
3. the ability to add, edit and delete Categorys
4. the ability to add, edit and delete Dishes
5. A dynamic nav bar and home page to show new menus

## Live Demo

Test username: admin
Test password: admin

Link: <https://duffy-cw2-restaurant.herokuapp.com/>

## Installation and setup

1.  ```bash git clone <https://github.com/DuffyCorp/WebDevCW2.git> ```
2.  ```bash npm install ```
3.  ```bash node index ```

## Design Changes

### Database

```json
    {
        menuName: String,
        category: [
            {
                catName: String,
                dishes: [
                    {
                        name: String,
                        price: String,
                        description: String,
                        vegetarian: Boolean,
                        glutenFree: Boolean,
                        available: Boolean,
                    },
                ]
            }
        ]
    }
```

### Website

## Tests

All tests are done in the TestReport.docx folder in the root of the directory

## Image Sources
