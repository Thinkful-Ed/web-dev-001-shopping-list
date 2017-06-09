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
const ITEM_DELETE_BUTTON_IDENTIFIER = "js-item-delete";
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

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false});
}

function deleteListItem(itemIndex) {
  console.log(`Deleting item at index "${itemIndex}" from shopping list`)
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

function handleDeleteItemClicked() {
  $(SHOPPING_LIST_ELEMENT_CLASS).on("click", `.${ITEM_DELETE_BUTTON_IDENTIFIER}`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
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
