$(function(){

  // listen for form submission
  $('#js-shopping-list-form').submit(function(event) {

    // stop the default form submission behavior
    event.preventDefault();

    // get the text value for the new item
    const listItem = $('.js-shopping-list-entry').val();

    // clear out the text input so user can input a new item if they want
    $('.js-shopping-list-entry').val('');

    // add the new shopping list item as a `li`, following the structure we
    // already have in `index.html`
    $('.shopping-list').append(
      `<li>
        <span class="shopping-item">${listItem}</span>
        <div class="shopping-item-controls">
          <button class="shopping-item-toggle">
            <span class="button-label">check</span>
          </button>
          <button class="shopping-item-delete">
            <span class="button-label">delete</span>
          </button>
        </div>
      </li>`);
  });

  // listen for click events on the delete buttons for shopping list items
  // note that we're using *event delegation* here. since new items can be
  // added to the shopping list, and we need to listen for delete and check
  // items on those items, we need to have the event listener on the parent element
  // which is already present when the page first loads. if this sounds confusing
  // go back and re-read the discussion of event delegation in the curriculum!
  $('.shopping-list').on('click', '.shopping-item-delete', function(event) {

    // this will look for the closest parent `li` element and remove it from the DOM.
    // in other words, it will remove the shopping list item.
    $(this).closest('li').remove();
  });


  // when a user clicks the "check" button, this will cause the checked off styling
  // to toggle. as with the delete behavior above, this also uses event delegation.
  $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {

    // go up to the parent li, then from there find the child`.shopping-item`  and
    // toggle the `.shopping-item__checked` class.
    $(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
  });

});