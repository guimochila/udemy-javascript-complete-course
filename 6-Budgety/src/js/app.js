// Budget Controller Module
var budgetController = (function () {
    

})();

// User-interface controller
var UIController = (function () {

})();

// App Controller
var controller = (function (budgetCtrl, UICtrl) {

    var ctrlAddItem = function () {
        // 1. Get input field data

        // 2. Add item to budget controller

        // 3. Add the item to UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI

        console.log('It works');
    };
    
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);

