// Module Pattern
/*
const myModule = (function () {
  let x = 23;

  const add = function (a) {
    return a + x;
  }

  return {
    publicTest: function(b) {
      return add(b);
    }
  }

})();
*/

const modelModule = (function () {

  const Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  const data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    }
  };

  return {
    addItem: function (type, des, val) {
      let newItem, ID;

      // create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // check the type and create a new constructor obj
      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      // push newly created obj to the array
      data.allItems[type].push(newItem);

      // return the new item
      return newItem;
    },

    testing: function () {
      console.log(data);
    }
  }

})();

const viewModule = (function () {

  const DOMStrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeList: '.income__list',
    expensesList: '.expenses__list',
  }

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMStrings.inputType).value,
        description: document.querySelector(DOMStrings.inputDescription).value,
        value: Number(document.querySelector(DOMStrings.inputValue).value),
      }
    },
    addListItem: function (obj, type) {
      let html, element;

      if (type === 'inc') {
        element = DOMStrings.incomeList;
        html = `<div class="item clearfix" id="income-${obj.id}">
          <div class="item__description">${obj.description}</div>
          <div class="right clearfix">
            <div class="item__value">+ ${obj.value}</div>
            <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
          </div>
        </div>`;
      } else if (type === 'exp') {
        element = DOMStrings.expensesList;
        html = `<div class="item clearfix" id="expense-${obj.id}">
          <div class="item__description">${obj.description}</div>
          <div class="right clearfix">
            <div class="item__value">- ${obj.value}</div>
            <div class="item__percentage">21%</div>
            <div class="item__delete">
              <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
          </div>
        </div>`;
      }

      document.querySelector(element).insertAdjacentHTML("beforeend", html);

    },

    clearFields: function () {
      let fields = document.querySelectorAll(`${DOMStrings.inputDescription}, ${DOMStrings.inputValue}`);
      fields = Array.from(fields);
      fields.forEach(el => el.value = "");
      fields[0].focus();
    },

    getDOMStrings: function () {
      return DOMStrings;
    }
  }

})();

const controller = (function (modelCtrl, viewCtrl) {

  const setupListeners = function () {

    const DOM = viewCtrl.getDOMStrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", () => {
      ctrlAddItem();
    });

    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  const updateBudget = function () {
    // 1. calculate the budget

    // 2. return the budget

    // 3. Display the budget in the view
  }

  const ctrlAddItem = function () {
    let input, newItem;
    // 1. get field input data for the view
    input = viewCtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. add the item to the budget model
      newItem = modelCtrl.addItem(input.type, input.description, input.value);
      // 3. add new item to the view
      viewCtrl.addListItem(newItem, input.type);
      viewCtrl.clearFields();

      updateBudget();
    }
  };


  return {
    init: function () {
      console.log("App started!")
      setupListeners();
    }
  }

})(modelModule, viewModule)

controller.init();