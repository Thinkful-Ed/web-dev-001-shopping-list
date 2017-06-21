'use strict';

const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];


const NEW_ITEM_FORM_ID = "#js-shopping-list-form";
const NEW_ITEM_FORM_INPUT_CLASS = ".js-shopping-list-entry";
const SHOPPING_LIST_ELEMENT_CLASS = ".js-shopping-list";
const ITEM_CHECKED_TARGET_IDENTIFIER = "js-shopping-item";
const ITEM_CHECKED_CLASS_NAME = "shopping-item__checked";
const ITEM_INDEX_ATTRIBUTE  = "data-item-index";
const ITEM_INDEX_ELEMENT_IDENTIFIER = "js-item-index-element";


// points to the DOM element that users click to
// check/uncheck list items
const ITEM_CHECKED_BUTTON_IDENTIFIER = "js-item-toggle";


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="${ITEM_INDEX_ELEMENT_IDENTIFIER}" ${ITEM_INDEX_ATTRIBUTE}="${itemIndex}">
      <span class="shopping-item ${ITEM_CHECKED_TARGET_IDENTIFIER} ${item.checked ? ITEM_CHECKED_CLASS_NAME : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle ${ITEM_CHECKED_BUTTON_IDENTIFIER}">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");
  const items = shoppingList.map(
    (item, index) => generateItemElement(item, index));
  return items.join();
}


function renderShoppingList() {
  console.log("Rendering shopping list");
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  $(SHOPPING_LIST_ELEMENT_CLASS).html(shoppingListItemsString);
}



function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}



function handleNewItemSubmit() {
  $(NEW_ITEM_FORM_ID).submit(function(event) {
    event.preventDefault();
    const newItemElement = $(NEW_ITEM_FORM_INPUT_CLASS);
    const newItemName = newItemElement.val();
    newItemElement.val("");
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

// this function is responsible for retieving the array index of a
// shopping list item in the DOM. recall that we're storing this value
// in a `data-item-index` attribute on each list item element in the DOM.
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest(`.${ITEM_INDEX_ELEMENT_IDENTIFIER}`)
    .attr(ITEM_INDEX_ATTRIBUTE);
  // the value of `data-item-index` will be a string, so we need to convert
  // it to an integer, using the built-in JavaScript `parseInt` function.
  return parseInt(itemIndexString, 10);
}

// this function is reponsible for toggling the `checked` attribute on an item.
function toggleCheckedForListItem(itemIndex) {
  console.log(`Toggling checked property for item at index ${itemIndex}`);
  // if `checked` was true, it becomes false, and vice-versa. also, here again
  // we're relying on side effect / mutating the global `STORE`
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}



// this function is responsible for noticing when users click the "checked" button
// for a shopping list item. when that happens it toggles the checked styling for that
// item.
function handleItemCheckClicked() {
  // note that we have to use event delegation here because list items are not originally
  // in the DOM on page load.
  $(SHOPPING_LIST_ELEMENT_CLASS).on("click", `.${ITEM_CHECKED_BUTTON_IDENTIFIER}`, event => {
    // call the `getItemIndexFromElement` function just above on the target of
    // the current, clicked element in order to get the index of the clicked
    // item in `STORE`
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    // toggle the clicked item's checked attribute
    toggleCheckedForListItem(itemIndex);
    // render the updated shopping list
    renderShoppingList();
  });
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('`handleDeleteItemClicked` ran');
}


function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}


$(handleShoppingList);
