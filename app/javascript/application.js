// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
//= require jquery3
//= require popper
//= require bootstrap-sprockets

import "@hotwired/turbo-rails"
import "controllers"
import "@fortawesome/fontawesome-free"

import "./packs/game"
import "./packs/record"
import "./packs/wishlist"
import "./packs/settings"

document.addEventListener('DOMContentLoaded',function(){
  console.log("DOMを読み込みました")
})
