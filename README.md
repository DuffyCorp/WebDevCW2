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

```bash 
    git clone https://github.com/DuffyCorp/WebDevCW2.git
```
```bash 
    npm install 
```
```bash
    node index 
```

## Design Changes

### Database

I changed my DB scheme to allow me to create a more dyncamic site and allow me to add edit and delete menus, categorys and dishes seperatly from one another but still link them.

```json
    {
        "menuName": "String",
        "category": [
            {
                "catName": "String",
                "dishes": [
                    {
                        "name": "String",
                        "price": "String",
                        "description": "String",
                        "vegetarian": "Boolean",
                        "glutenFree": "Boolean",
                        "available": "Boolean",
                    },
                ]
            }
        ]
    }
```

### Website

The biggest change Is I added an admin side bar to my webpage to allow an admin to create or jump to a table from anywhere on the website to aid in usability.

I also changed my admin page about to remove the big add buttons at the top and made them buttons at the top right of each table and limited how much data each table displays to help with usability.

I removed my manage staff page with its own controls and addde a staff table to the admin page to make it a more user friendly experience.

I changed my forms alot and by using javascript was able to approprialty pre populatet the fields with data or only display the correct options in the dropdowns to aid in the user experience. Although this could have been done alot easier using react.
## Tests

All tests are done in the TestReport.docx folder in the root of the directory

## Image Sources

Hero image source: https://unsplash.com/photos/nmpW_WwwVSc

Social media Icons: https://www.iconfinder.com/social-media-icons
