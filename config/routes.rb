Rails.application.routes.draw do
  
  resources :adventure_likes
  resources :adventures
  resources :cats
  resources :users
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/auth", to: "users#show"
  get "/randomcat", to: "cats#random"
  get "/mostlikes", to: "adventures#most_likes"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
