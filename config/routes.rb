Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "records#new"

  get 'login', to: 'user_sessions#new'
  post "login", to: 'user_sessions#create'
  delete 'logout', to: 'user_sessions#destroy'
  get "signup", to: "users#new"

  resources :records, only: %i[index show new create update destroy]
  resources :users, only: %i[new create]
end
