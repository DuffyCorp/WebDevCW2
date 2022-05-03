var catCount = 0;
var storedMenuName = '';
var storedCatName = '';   
    
    if (screen.height < 768){
        $('#sidebar, #content').toggleClass('active');  
        }


    getCatIndex  = function(menuName, category) {
        if (storedMenuName != menuName){
            storedMenuName = menuName
            if (catCount > 0){
                catCount = 0
            }
            if (storedCatName != category){
                storedCatName = category
            }
            return catCount
        }
        if (storedMenuName = menuName){
            if (storedCatName != category){
                catCount = catCount + 1
            }
            return catCount
        }
    }