'use strict';

const STORE = [
  {name: "apples", checked: false},
  {name: "oranges", checked: false},
  {name: "milk", checked: true},
  {name: "bread", checked: false}
];



// below we've set up some constants that point to
// classes, ids, and other attributes from our HTML and CSS
// that our application code will need to use to manipulate
// the DOM.
// We *could* just have these values hard coded into the particular
// functions that use them, but that is harder to maintain. What if
// for some reason we need to change '.js-shopping-list', which is the
// identifier for the shopping list element in our HTML? With these
// constants, it only needs to be changed in one place, at
// the top of the file, even if it's referenced in multiple places.
const NEW_ITEM_FORM_INPUT_CLASS = ".js-shopping-list-entry";
const SHOPPING_LIST_ELEMENT_CLASS = ".js-shopping-list";
const ITEM_CHECKED_TARGET_IDENTIFIER = "js-shopping-item";
const ITEM_CHECKED_CLASS_NAME = "shopping-item__checked";
const ITEM_INDEX_ATTRIBUTE  = "data-item-index";
const ITEM_INDEX_ELEMENT_IDENTIFIER = "js-item-index-element";
const ITEM_CHECKED_BUTTON_IDENTIFIER = ".js-item-toggle";


// this function is reponsible for generating an HTML string representing
// a shopping list item. `item` is the object representing the list item.
// `itemIndex` is the index of the item from the shopping list array (aka,
// `STORE`). `template` is a jQuery object that represents the list item HTML
// template.
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


// this function is reponsible for generating all the `<li>`s that will eventually get
// inserted into the shopping list `ul` in the com. it takes one argument,
// `shoppingList` which is the array representing the data in the shopping list.
function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");
  // `items` will be an array of strings representing individual list items.
  // we use the array `.map` function
  // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map?v=control)
  // to loop through `shoppingList`.
  const items = shoppingList.map(
    (item, index) => generateItemElement(item, index));
  // this function is responsible for returning a string, but `items` is an array.
  // we return `items.join` because that will join the individual strings in `items`
  // together into a single string.
  return items.join();
}


// this function is responsible for rendering a shopping list in the DOM.
function renderShoppingList() {
  console.log("Rendering shopping list");
  // we call `generateShoppingItemsString` to generate the string representing
  // the shopping list items
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  // we then find the `SHOPPING_LIST_ELEMENT_ CLASS` element in the DOM,
  // (which happens to be a `<ul>` with the class `.js-shopping-list` on it )
  // and set its inner HTML to the value of `shoppingListItemsString`.
  $(SHOPPING_LIST_ELEMENT_CLASS).html(shoppingListItemsString);
}


function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  console.log('`handleNewItemSubmit` ran');
}


function handleItemCheckClicked() {
  // this function will be reponsible for when users click the "check" button on
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
