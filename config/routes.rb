Rails.application.routes.draw do
  
  root "records#new"
  get 'login', to: 'user_sessions#new'
  post "login", to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'
  get "signup", to: "users#new"

  resources :records, only: %i[index show new create update destroy]
  resources :users, only: %i[new create]
  namespace :settings do
    resource :statistics, only: %i[show]
    resources :wishlists, only: %i[index show create update]
    resource :notifications, only: %i[show]
    resource :terms, only: %i[show]
    resource :inquiry, controller: 'inquiry', only: %i[show create]
  end
end
