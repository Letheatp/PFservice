document.addEventListener('turbo:load', function() {
  let wishlistContainer = document.getElementById("wishlist-container");
  if(wishlistContainer) {
    var wishlistElements = wishlistContainer.querySelectorAll(".wishlist-element");
    var appendButton = wishlistContainer.querySelector("#append-wishlist-element");
    var newWishlist = wishlistContainer.querySelector("#new-wishlist");

    appendButton.onclick = showWishlistCreateField;
    
    for(let i = 0; i < wishlistElements.length; i++){
      let element = wishlistElements[i];
      initializeWishlistElement(element);
    }
  }

  function fetchWishlistItems(wishlist_id){
    return new Promise((resolve, reject) => {
      const url = `/settings/wishlists/${wishlist_id}`

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
          'X-Requested-With': 'XMLHttpRequest'
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => {
        console.error(error);
        reject(error);
      });
      })
  }

  function drawWishlistItems(items){
    let wishlistModalElement = document.getElementById('wishlist-modal')
    let body = wishlistModalElement.querySelector(".modal-body");
    let itemsElement = document.createElement('div');
    itemsElement.classList.add('container-fluid');
    body.appendChild(itemsElement);

    for(let i=0; i<items.length; i++){
      const item = items[i];
      let itemElement = document.createElement('div');
      itemElement.classList.add('row');
      itemsElement.appendChild(itemElement);

      itemElement.innerHTML = `
        <div class="col-md-3"><img src=${item['image_url']}></div>
        <div class="col-md-8 ms-auto">
          <a href=${item['url']} class="col-sm-9">${item['name']}</a>
          <div class="col-sm-9">${item['price']}</div>
        </div>`
    }
  }

  function showWishlist(element){
    const id = getIdFromListString(element.id);

    fetchWishlistItems(id)
      .then(items => {
        drawWishlistItems(items);
      })
      .catch(error => {
          console.error('Error fetching wishlist items:', error);
      })
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
    const id = getIdFromListString(element.id);

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

    element.innerHTML = `
      <input class="form-control wishlist-element-input" value="${value}">
      <div class="og-button wishlist-element-check mx-4"><i class="fa-solid fa-check mx-1"></i></div>`

    const check_button = element.querySelector(".wishlist-element-check");
    check_button.onclick = function() { finishEditWishlistURL(element) };
  }

  function finishEditWishlistURL(element){
    const value = element.querySelector(".wishlist-element-input").value; 

    element.innerHTML = `\
    <div class="form-control wishlist-element-input wishlist-element-linked" data-bs-toggle="modal" data-bs-target="#wishlist-modal">${value}</div>
    <div class="og-button wishlist-element-update"><i class="fa-solid fa-repeat me-1 ms-3"></i></div>
    <div class="og-button wishlist-element-edit"><i class="fa-solid fa-pen-to-square mx-1"></i></div>
    <div class="og-button wishlist-element-delete"><i class="fa-solid fa-trash mx-1"></i></div>`
  
    initializeWishlistElement(element);
    updateWishlist(element);
  }

  function deleteWishlist(element){
    const result = window.confirm('削除しますか？');
    const id = getIdFromListString(element.id); 

    if(result){
      fetch(`/settings/wishlists/${id}`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          console.log('success delete');
          element.remove();
        } else {
          console.log('failed delete');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }

  function showWishlistCreateField(){
    newWishlist.innerHTML = `
        <input class="form-control wishlist-element-input">
        <div class="og-button" id="wishlist-create-check">
          <i class="fa-solid fa-check ms-3"></i>
        </div>`

    appendButton.remove();
    let wishlist_create_check = newWishlist.querySelector("#wishlist-create-check");
    wishlist_create_check.onclick = completeWishlistCreateField;
  };

  function completeWishlistCreateField(){
    const input_field = newWishlist.querySelector(".wishlist-element-input")
    const value = input_field.value;

    if(value != ""){
      let created_wishlist_element = document.createElement('div');
      created_wishlist_element.classList.add("d-flex", "align-items-center", "my-1", "wishlist-element");
  
      created_wishlist_element.innerHTML = `
      <div class="form-control wishlist-element-input wishlist-element-linked" data-bs-toggle="modal" data-bs-target="#wishlist-modal">${value}</div>
        <div class="og-button wishlist-element-update"><i class="fa-solid fa-repeat me-1 ms-3"></i></div>
        <div class="og-button wishlist-element-edit"><i class="fa-solid fa-pen-to-square mx-1"></i></div>
        <div class="og-button wishlist-element-delete"><i class="fa-solid fa-trash mx-1"></i></div>`;
  
      let wishlist_list = wishlistContainer.querySelector("#wishlist-list");
      wishlist_list.appendChild(created_wishlist_element);
  
      createWishlist(created_wishlist_element);
    }
    
    closeWishlistCreateField();
  }

  function closeWishlistCreateField(){
    newWishlist.innerHTML = '\
      <button class="ms-auto" id="append-wishlist-element">追加</button>';

    appendButton = newWishlist.querySelector("#append-wishlist-element");
    appendButton.onclick = showWishlistCreateField;
  }

  function initializeWishlistElement(element) {
    let field = element.querySelector(".wishlist-element-input");
    let update_button = element.querySelector(".wishlist-element-update");
    let edit_button = element.querySelector(".wishlist-element-edit");
    let delete_button = element.querySelector(".wishlist-element-delete");

    field.onclick = function() { 
      if(element.querySelector(".wishlist-element-linked")){
        console.log('show wishlist');
        showWishlist(element);
      }
    }
    update_button.onclick = () => reloadWishlistURL(element);
    edit_button.onclick = () => editWishlistURL(element);
    delete_button.onclick = () => deleteWishlist(element);
  }

  function getIdFromListString(str){
    const match = str.match(/-(\d+)/);
    return match ? match[1] : null;
  }
})