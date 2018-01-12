//=================================================
// functions
//=================================================

function addBurger() {

    var newBurger = {
        burger_name: $("#newBurger").val().trim()
    };
    console.log("newBurger: " + JSON.stringify(newBurger));
    // Send the POST request.
    $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
    }).then(
        function () {
            console.log("created the new burger");
            // Reload the page to get the updated list
            location.reload();
        });
}

function updateDevourStatus(id) {  
    console.log("id: " + id);
    // Send the POST request.
    $.ajax("/api/devoured/" + id, {
        type: "PUT",
        data: id
    }).then(
        function () {
            console.log("devoured a burger");
            // Reload the page to get the updated list
            location.reload();
        });
}


//=================================================
// On Page Load
//=================================================
$(document).ready(function () {


            // ========================================================================
            // When the submit button is clicked, a new row is added to the database
            // ========================================================================
            $(document).on('click', '#submitBtn', function (event) {
                // Make sure to preventDefault on a submit event.
                event.preventDefault();
                console.log("i clicked submit");
                addBurger();
            });




            // ========================================================================
            // When the devour button is clicked, the devoured flag in the database 
            // is set to true, marking the row as "eaten"
            // ========================================================================
            $(document).on('click', '.devour', function (event) {
                // Make sure to preventDefault on a submit event.
                event.preventDefault();
                console.log("i clicked a devour button");
                var id = $(this).data("id");
                updateDevourStatus(id);

            });
        });
    