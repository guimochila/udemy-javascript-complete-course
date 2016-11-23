// Budget Controller Module
var budgetController = (function () {

 

})();

// User-interface controller
var UIController = (function () {

    // DOM Cache
    var DOMStrings = {
        $inputType: document.querySelector('.add__type'),
        $inputDescription: document.querySelector('.add__description'),
        $inputValue: document.querySelector('.add__value'),
        $inputBtn: document.querySelector('.add__btn')
    };

    return {
        getinput: function () {
            return {
                type: DOMStrings.$inputType.value,
                description: DOMStrings.$inputDescription.value,
                value: DOMStrings.$inputValue.value
            }
        },
        getDOMStrings: DOMStrings
    }

})();

// Global App Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMStrings;

        DOM.$inputBtn.addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        // 1. Get input field data
        var input = UICtrl.getinput();

        // 2. Add item to budget controller

        // 3. Add the item to UI

        // 4. Calculate the budget

        // 5. Display the budget on the UI
    };

    return {
        init: function() {
            console.log('App started.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();