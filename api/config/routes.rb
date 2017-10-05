Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :session, only: [:create]

  get '/health' => 'health#index'

  # not implenting /canary here, because it's defined as a middleware
end
