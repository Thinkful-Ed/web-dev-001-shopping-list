'use strict';

const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];



// this points to the form for submitting new shopping
// list items
const NEW_ITEM_FORM_ID = "#js-shopping-list-form";
// this points to the input element containing the name
// of the new item
const NEW_ITEM_FORM_INPUT_CLASS = ".js-shopping-list-entry";
const SHOPPING_LIST_ELEMENT_CLASS = ".js-shopping-list";
const ITEM_CHECKED_TARGET_IDENTIFIER = "js-shopping-item";
const ITEM_CHECKED_CLASS_NAME = "shopping-item__checked";
const ITEM_INDEX_ATTRIBUTE  = "data-item-index";
const ITEM_INDEX_ELEMENT_IDENTIFIER = "js-item-index-element";



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


// name says it all. responsible for adding a shopping list item.
function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  // adding a new item to the shopping list is as easy as pushing a new
  // object onto the `STORE` array. we set `name` to `itemName` and default
  // the new item to be unchecked (`checked: false`).
  //
  // Note that this function intentionally has *side effects* -- it mutates
  // the global variable STORE (defined at the top of this file).
  // Ideally you avoid side effects whenever possible,
  // and there are good approaches to these sorts of situations on the front
  // end that avoid side effects, but they are a bit too complex to get into
  // here. Later in the course, when you're learning React though, you'll
  // start to learn approaches that avoid this.
  STORE.push({name: itemName, checked: false});
}


// responsible for watching for new item submissions. when those happen
// it gets the name of the new item element, zeros out the form input value,
// adds the new item to the list, and re-renders the shopping list in the DOM.
function handleNewItemSubmit() {
  $(NEW_ITEM_FORM_ID).submit(function(event) {
    // stop the default form submission behavior
    event.preventDefault();
    // we get the item name from the text input in the submitted form
    const newItemElement = $(NEW_ITEM_FORM_INPUT_CLASS);
    const newItemName = newItemElement.val();
    // now that we have the new item name, we remove it from the input so users
    // can add new items
    newItemElement.val("");
    // update the shopping list with the new item...
    addItemToShoppingList(newItemName);
    // then render the updated shopping list
    renderShoppingList();
  });
}


function handleItemCheckClicked() {
  // this funciton will be reponsible for when users click the "check" button on
  // a shopping list item.
  console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('`handleDeleteItemClicked` ran');
}


// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
