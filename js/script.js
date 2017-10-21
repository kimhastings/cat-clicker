/* ======= Model ======= */

var model = {
    cats: [
        {
            catName: "Sleepy",
            catImage: "img/cat1.jpg",
            catScore: 0
        },
        {
            catName: "Dopey",
            catImage: "img/cat2.jpg",
            catScore: 0
        },
        {
            catName: "Grumpy",
            catImage: "img/cat3.jpg",
            catScore: 0
        },
        {
            catName: "Fuzzy",
            catImage: "img/cat4.jpg",
            catScore: 0
        },
        {
            catName: "Wuzzy",
            catImage: "img/cat5.jpg",
            catScore: 0
        }
    ],
    cat: null
}

/* ======= Octopus ======= */

var octopus = {
    init: function() {
        // Choose a random cat to start
        model.cat = model.cats[Math.floor(Math.random() * model.cats.length)];

        // Initialize views
        viewCatList.init();
        viewCatDetails.init();
        viewAdminArea.init();
    },

    // Returns array of all cats
    getCats: function() {
        return model.cats;
    },

    // Returns current cat
    getCurrentCat: function() {
        return model.cat;
    },

    // Changes which cat is current
    setCurrentCat: function(newCat) {
        model.cat = newCat;
        viewCatDetails.render(); 
        viewAdminArea.render();        
    },

    // Changes name of cat in model
    setCurrentCatName: function(newName) {
        model.cat.catName = newName;
        viewCatList.render();
        viewCatDetails.render(); 
        viewAdminArea.render();        
    },

    // Changes image of cat in model
    setCurrentCatImage: function(newImage) {
        model.cat.catImage = newImage;
        viewCatDetails.render(); 
        viewAdminArea.render();        
    },

    // Changes score of cat in model
    setCurrentCatScore: function(newScore) {
        model.cat.catScore = newScore;
        viewCatDetails.render(); 
        viewAdminArea.render();        
    },

    // Increment counter for current cat
    incrementCat: function() {
        model.cat.catScore++;
        viewCatDetails.render();
        viewAdminArea.render();        
    },
    // Reset counter for current cat
    resetCat: function() {
        model.cat.catScore = 0;
        viewCatDetails.render();         
        viewAdminArea.render();        
    }
}

/* ======= View (Cat List) ======= */

var viewCatList = {

    init: function() {
        
        this.render();
    },

    render: function() {
        var cat, elem, i;
        var catListElem = document.getElementById('catList');
        
        // Empty the cat list
        catListElem.innerHTML = '';

        // Loop over the cats
        var cats = octopus.getCats();
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.catName;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    viewCatList.render();
                };
            })(cat));

            // finally, add the element to the list
            catListElem.appendChild(elem);
        }
    }
}

/* ======= View (Cat Details) ======= */

var viewCatDetails = {

    init: function() {
        // Use these to change cat name/image or update score
        this.nameElem = document.getElementById("catName");
        this.imageElem = document.getElementById("catImage")
        this.scoreElem = document.getElementById("catScore");

        // Handler for clicking cat
        this.imageElem.addEventListener('click', function(){
            octopus.incrementCat();
        });
        // Handler for clicking reset button
        this.resetElem = document.getElementById("reset");
        this.resetElem.addEventListener('click', function(){
            octopus.resetCat();
        });
        
        // Initial render
        this.render();
    },

    render: function() {
        // Update cat name, image and score on page
        var newCat = octopus.getCurrentCat();
        this.nameElem.innerText = newCat.catName;
        this.imageElem.src = newCat.catImage;
        this.scoreElem.innerText = "Clicks:" + newCat.catScore;      
    }
}

/* ======= View (Admin Area) ======= */

var viewAdminArea = {
    
        init: function() {

            // Use this to show/hide admin area
            this.adminElem = document.getElementById("adminArea");
            
            // Use these to change cat name, image or score in admin area
            this.nameElem = document.getElementById("newName");
            this.imageElem = document.getElementById("newImage")
            this.scoreElem = document.getElementById("newScore");

            // Handler for clicking admin button
            this.buttonElem = document.getElementById("admin");
            this.buttonElem.addEventListener('click', (function() {
                return function() {                                
                    // Fill in current cat name, image and score
                    viewAdminArea.render();

                    // Make admin area visible
                    viewAdminArea.show();                
                }
            })(this));

            // Handler for clicking cancel button
            this.buttonElem = document.getElementById("cancel");
            this.buttonElem.addEventListener('click', (function() {
                return function() {
                    // Hide admin area
                    viewAdminArea.hide();                
                }
            })(this));

            // Handler for clicking save button
            this.buttonElem = document.getElementById("save");
            this.buttonElem.addEventListener('click', (function() {
                return function() {

                    // Update cat name, image and score in model
                    octopus.setCurrentCatName (viewAdminArea.nameElem.value);
                    octopus.setCurrentCatImage (viewAdminArea.imageElem.value);
                    octopus.setCurrentCatScore (viewAdminArea.scoreElem.value);

                    // Hide admin area
                    viewAdminArea.hide();                
                }
            })(this));
        },

        show: function() {
            this.adminElem.style.display = "block";
        },

        hide: function() {
            this.adminElem.style.display = "none";
        },

        render: function() {

            // Fill in current cat name, image and score
            var currentCat = octopus.getCurrentCat();
            this.nameElem.value = currentCat.catName;
            this.imageElem.value = currentCat.catImage;
            this.scoreElem.value = currentCat.catScore; 

        }

    }
    /* // Count each click
$( "#catImage" ).on("click",function() {
    catScores[cat]++;
    scoreElem.innerText = "Clicks:" + catScores[cat];
});

// Reset counter
$(document).ready(function() {
    $('#reset1').on("click",function(){
        catScores[cat] = 0;
        scoreElem.innerText = "Clicks: 0";
    }); 
});

// Change cat when requested
$("#catList").on("click", "li", function() {
    cat = $(this).index();
    changeCat(cat);
});
*/

 // Fire it up
octopus.init();