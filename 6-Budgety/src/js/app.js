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

    var calculateTotal = function (type) {
        var sum = 0;

        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.total[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        total: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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

        deleteItem: function (type, id) {
            var ids, index;

            ids = data.allItems[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }

        },

        calculateBudget: function () {
            // Calculate total income and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // Calculate the budget
            data.budget = data.total.inc - data.total.exp;

            // Calculate the percentage
            if (data.total.inc > 0) {
                data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            }
        }

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
        $expenseContainer: document.querySelector('.expenses__list'),
        $budgetLabel: document.querySelector('.budget__value'),
        $incomeLabel: document.querySelector('.budget__income--value'),
        $expenseLabel: document.querySelector('.budget__expenses--value'),
        $percentageLabel: document.querySelector('.budget__expenses--percentage'),
        $container: document.querySelector('.container')
    };

    return {
        getinput: function () {
            return {
                type: DOMStrings.$inputType.value, // inc or exp
                description: DOMStrings.$inputDescription.value,
                value: parseFloat(DOMStrings.$inputValue.value)
            }
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML string with placehold text

            if (type === 'inc') {
                element = DOMStrings.$incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description"> %description% </div ><div class="right clearfix"><div class="item__value"> %value% </div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.$expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description"> %description%</div><div class="right clearfix"> <div class="item__value"> %value% </div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>';
            }

            // Replace the placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the HTML into the DOM
            element.insertAdjacentHTML('beforeend', newHtml);

        },

        deleteListItem: function (selectorID) {

            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },

        clearFields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll('.add__description' + ', ' + '.add__value');

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function (element, index, arr) {
                element.value = "";
            }, this);

            fieldsArr[0].focus();
        },

        displayBudget: function (obj) {
            DOMStrings.$budgetLabel.textContent = obj.budget;
            DOMStrings.$incomeLabel.textContent = obj.totalInc;
            DOMStrings.$expenseLabel.textContent = obj.totalExp;

            if (obj.percentage > 0) {
                DOMStrings.$percentageLabel.textContent = obj.percentage + '%';
            } else {
                DOMStrings.$percentageLabel.textContent = '---';
            }
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

        DOM.$container.addEventListener('click', crtlDeleteItem);
    };

    var updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function () {
        var input, newItem;
        // 1. Get input field data
        input = UICtrl.getinput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
        }

    };

    var crtlDeleteItem = function (event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {

            //Getting type and ID from the item
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            // 2. Delete the item form the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();
        }
    };

    return {
        init: function () {
            console.log('App started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();