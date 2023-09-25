export default function func_wishlist() {
  var wishlist_container = document.getElementById("wishlist-container");
  if(wishlist_container){
    var wishlist_elements = wishlist_container.querySelectorAll(".wishlist-element");
    var append_button = wishlist_container.querySelector("#append-wishlist-element");
    var new_wishlist = wishlist_container.querySelector("#new-wishlist");

    append_button.onclick = showWishlistCreateField;
    
    for(let i = 0; i < wishlist_elements.length; i++){
      let form = wishlist_elements[i];
      initializeWishlistElement(form);
    }
  }
  function createWishlist(element){
    const url = element.querySelector(".wishlist-element-linked").innerText;

    fetch("/settings/wishlists",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify({ url: url }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        console.log('success create')
      } else {
        console.log('failed create')
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function updateWishlist(element) {
    const url = element.querySelector(".wishlist-element-linked").innerText;
    const id = getIdFromListString(element.id)

    fetch(`/settings/wishlists/${id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
      },
      body: JSON.stringify({ url: url }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        console.log('success update')
      } else {
        console.log('failed update')
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function reloadWishlistURL(element){
    
  }

  function editWishlistURL(element){
    const id = getIdFromListString(element.id)
    const value = element.querySelector(".wishlist-element-input").innerText;

    element.innerHTML = `\
      <input class="form-control wishlist-element-input" value="${value}">\
      <div class="og-button wishlist-element-check mx-4"><i class="fa-solid fa-check mx-1"></i></div>`

    const check_button = element.querySelector(".wishlist-element-check");
    check_button.onclick = function() { finishEditWishlistURL(element) };
  }

  function finishEditWishlistURL(element){
    const value = element.querySelector(".wishlist-element-input").value; 

    element.innerHTML = `\
    <a class="form-control wishlist-element-input wishlist-element-linked" href="#">${value}</a>\
    <div class="og-button wishlist-element-update"><i class="fa-solid fa-repeat me-1 ms-3"></i></div>\
    <div class="og-button wishlist-element-edit"><i class="fa-solid fa-pen-to-square mx-1"></i></div>\
    <div class="og-button wishlist-element-delete"><i class="fa-solid fa-trash mx-1"></i></div>`
  
    initializeWishlistElement(element);
    updateWishlist(element);
  }

  function deleteWishlist(element){

  }

  function showWishlistCreateField(){

    new_wishlist.innerHTML = '\
        <input class="form-control wishlist-element-input">\
        <div class="og-button" id="wishlist-create-check">\
          <i class="fa-solid fa-check ms-3"></i>\
        </div>';

    append_button.remove();
    let wishlist_create_check = new_wishlist.querySelector("#wishlist-create-check");
    wishlist_create_check.onclick = completeWishlistCreateField;
  };

  function completeWishlistCreateField(){
    const input_field = new_wishlist.querySelector(".wishlist-element-input")
    const value = input_field.value;

    if(value != ""){
      let created_wishlist_element = document.createElement('div');
      created_wishlist_element.classList.add("d-flex", "align-items-center", "my-1", "wishlist-element");
  
      created_wishlist_element.innerHTML = `\
        <a class="form-control wishlist-element-input wishlist-element-linked" href="#">${value}</a>\
        <div class="og-button wishlist-element-update"><i class="fa-solid fa-repeat me-1 ms-3"></i></div>\
        <div class="og-button wishlist-element-edit"><i class="fa-solid fa-pen-to-square mx-1"></i></div>\
        <div class="og-button wishlist-element-delete"><i class="fa-solid fa-trash mx-1"></i></div>`;
  
      let wishlist_list = wishlist_container.querySelector("#wishlist-list");
      wishlist_list.appendChild(created_wishlist_element);
  
      createWishlist(created_wishlist_element);

      updateWishlist(element);
    }
    
    closeWishlistCreateField();
  }

  function closeWishlistCreateField(){
    new_wishlist.innerHTML = '\
      <button class="ms-auto" id="append-wishlist-element">追加</button>';

    append_button = new_wishlist.querySelector("#append-wishlist-element");
    append_button.onclick = showWishlistCreateField;
  }

  function initializeWishlistElement(element) {
    let field = element.querySelector(".wishlist-element-input");
    let update_button = element.querySelector(".wishlist-element-update");
    let edit_button = element.querySelector(".wishlist-element-edit");
    let delete_button = element.querySelector(".wishlist-element-delete");

    update_button.onclick = function() { reloadWishlistURL(element) };
    edit_button.onclick = function() { editWishlistURL(element) };
    delete_button.onclick = function() { deleteWishlist(element) };
  }

  function getIdFromListString(str){
    const match = str.match(/-(\d+)/);
    return match ? match[1] : null;
  }
}