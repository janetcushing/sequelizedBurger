//=================================================
// functions
//=================================================

function addBurger(customerName, burgerName) {
    var dataObject = {
        customer_name: customerName,
        burger_name: burgerName
    };
    console.log("dataObject: " + JSON.stringify(dataObject));
    // Send the POST request.
    $.ajax("/api/burgers/new", {
        type: "POST",
        data: dataObject
    }).then(
        function () {
            console.log("created the new burger");
            // Reload the page to get the updated list
            location.reload();
        });
}

function updateDevourStatus(id) {
    console.log("im in updateDevourStatus");
    var dataObject = {
        id: id
    }
    console.log("dataObject: " + dataObject);
    // Send the POST request.
    $.ajax("/api/devoured/" + id, {
        type: "PUT",
        data: dataObject
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
        var customerName = $("#newCustomer").val().trim();
        var burgerName = $("#newBurger").val().trim();
        if (customerName && burgerName) {
            addBurger(customerName, burgerName);
        } else if (customerName) {
            $("#newBurger").attr("placeholder", "**Enter Burger Name**");
            $("#newBurger").addClass("bold_red");
        } else if (burgerName) {
            $("#newCustomer").attr("placeholder", "**Enter Customer Name**");
            $("#newCustomer").addClass("bold_red");
        } else if (!customerName && !burgerName) {
            $("#newBurger").attr("placeholder", "**Enter Burger Name**");
            $("#newBurger").addClass("bold_red");
            $("#newCustomer").attr("placeholder", "**Enter Customer Name**");
            $("#newCustomer").addClass("bold_red");
        }
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