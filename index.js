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
const ITEM_CHECKED_BUTTON_IDENTIFIER = "js-item-toggle";
const ITEM_CHECKED_CLASS_NAME = "shopping-item__checked";
const ITEM_INDEX_ATTRIBUTE  = "data-item-index";
const ITEM_INDEX_ELEMENT_IDENTIFIER = "js-item-index-element";


// used to point to element that users click to delete
// an item from shopping list.
const ITEM_DELETE_BUTTON_IDENTIFIER = "js-item-delete";



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


// name says it all. responsible for deleting a list item.
function deleteListItem(itemIndex) {
  console.log(`Deleting item at index "${itemIndex}" from shopping list`);
  // as with `addItemToShoppingLIst`, this function also has the side effect of
  // mutating the global STORE value.
  //
  // we call `.splice` at the index of the list item we want to remove, with a length
  // of 1. this has the effect of removing the desired item, and shifting all of the
  // elements to the right of `itemIndex` (if any) over one place to the left, so we
  // don't have an empty space in our list.
  STORE.splice(itemIndex, 1);
}



function toggleCheckedForListItem(itemIndex) {
  console.log(`Toggling checked property for item at index ${itemIndex}`);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
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


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest(`.${ITEM_INDEX_ELEMENT_IDENTIFIER}`)
    .attr(ITEM_INDEX_ATTRIBUTE);
  return parseInt(itemIndexString, 10);
}


function handleItemCheckClicked() {
  $(SHOPPING_LIST_ELEMENT_CLASS).on("click", `.${ITEM_CHECKED_BUTTON_IDENTIFIER}`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}


// this function is responsible for noticing when users click the "Delete" button for
// a shopping list item. when that happens, it removes the item from the shopping list
// and then rerenders the updated shopping list.
function handleDeleteItemClicked() {
  // like in `handleItemCheckClicked`, we use event delegation

  $(SHOPPING_LIST_ELEMENT_CLASS).on("click", `.${ITEM_DELETE_BUTTON_IDENTIFIER}`, event => {
    // get the index of the item in STORE
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    // delete the item
    deleteListItem(itemIndex);
    // render the updated shopping list
    renderShoppingList();
  });
}


function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}


$(handleShoppingList);
