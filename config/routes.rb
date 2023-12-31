Rails.application.routes.draw do
  
  root "records#new"
  get "login", to: "user_sessions#new"
  post "login", to: "user_sessions#create"
  delete "logout", to: "user_sessions#destroy"
  get "signup", to: "users#new"

  resources :records, only: %i[index show new create update destroy]
  resources :users, only: %i[new create]
  get "games", to: "games#index"
  namespace :settings do
    get "statistics", to: "statistics#index"
    resources :wishlists, only: %i[index show create update destroy]
    get "notifications", to: "notifications#edit"
    patch "notifications", to: "notifications#update"
    get "terms", to: "terms#index"
    get "inquiry", to: "inquiry#new"
    post "inquiry", to: "inquiry#create"
  end
end
