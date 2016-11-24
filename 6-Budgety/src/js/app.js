'use strict';

// Budget Controller Module
var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var allExpensives = [];
    var allIncomes = [];
    var totalExpress = 0;

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            //Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            //Create newItem based on exp or inc type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push in into the data sctructure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },


    };

})();

// User-interface controller
var UIController = (function () {

    // DOM Cache
    var DOMStrings = {
        $inputType: document.querySelector('.add__type'),
        $inputDescription: document.querySelector('.add__description'),
        $inputValue: document.querySelector('.add__value'),
        $inputBtn: document.querySelector('.add__btn'),
        $incomeContainer: document.querySelector('.income__list'),
        $expenseContainer: document.querySelector('.expenses__list')
    };

    return {
        getinput: function () {
            return {
                type: DOMStrings.$inputType.value, // inc or exp
                description: DOMStrings.$inputDescription.value,
                value: DOMStrings.$inputValue.value
            }
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML string with placehold text

            if (type === 'inc') {
                element = DOMStrings.$incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description"> %description% </div ><div class="right clearfix"><div class="item__value"> %value% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.$expenseContainer;
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description"> %description%</div><div class="right clearfix"> <div class="item__value"> %value% </div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
            }

            // Replace the placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            element.insertAdjacentHTML('beforeend', newHtml);
        },

        getDOMStrings: function () {
            return DOMStrings;
        }
    }

})();

// Global App Controller
var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMStrings();

        DOM.$inputBtn.addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function () {
        var input, newItem;
        // 1. Get input field data
        input = UICtrl.getinput();

        // 2. Add item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3. Add the item to UI
        UICtrl.addListItem(newItem, input.type);
        // 4. Calculate the budget

        // 5. Display the budget on the UI
    };

    return {
        init: function () {
            console.log('App started.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();