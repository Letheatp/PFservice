document.addEventListener('turbo:load', function() {
  var settings_tab = document.getElementById("v-pills-settings-tab");
  var settings_tab_element = document.getElementById("settings-tab-element");
  if(false){
    initializeTab();
    initializeObserver();
  }

  function openStatisticsTab(){
    let url = "statistics";
    updateTabContent(url)
  }

  function openWishlistsTab(){
    let url = "wishlists";
    updateTabContent(url)
  }

  function openNotificationsTab(){
    let url = "notifications";
    updateTabContent(url)
  }

  function openTermsTab(){
    let url = "terms";
    updateTabContent(url)
  }

  function openInquiryTab(){
    let url = "inquiry";
    updateTabContent(url)
  }

  function updateTabContent(url){
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/html',
        'X-CSRF-Token': document.querySelector('[name="csrf-token"]').content,
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => response.text())
    .then(html => {
      settings_tab_element.innerHTML = html;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function initializeTab(){
    var statisticsTab = settings_tab.querySelector("#v-pills-statistics-tab");
    var wishlistsTab = settings_tab.querySelector("#v-pills-wishlists-tab");
    var notificationsTab = settings_tab.querySelector("#v-pills-notifications-tab");
    var termsTab = settings_tab.querySelector("#v-pills-terms-tab");
    var inquiryTab = settings_tab.querySelector("#v-pills-inquiry-tab");

    statisticsTab.onclick = openStatisticsTab;
    wishlistsTab.onclick = openWishlistsTab;
    notificationsTab.onclick = openNotificationsTab;
    termsTab.onclick = openTermsTab;
    inquiryTab.onclick = openInquiryTab;
  }

  function initializeObserver(){
    const config = {
      childList: true
    }

    const callback = function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList" && document.getElementById("wishlist-container")) {
          func_wishlist();
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(settings_tab_element, config);
  }
})