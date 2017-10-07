Rails.application.routes.draw do
  resources :users, only: [:create]
  resources :session, only: [:create]

  get '/health' => 'health#index'
end
