Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "records#index"

  resources :records, only: %i[index]
  get "/signup", to: "users#new" 
  resources :users, only: %i[new create]
end
