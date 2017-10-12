Rails.application.routes.draw do
  resources :users, only: [:create]

  namespace :auth do
    post :session, to: 'session#create'
    post :refresh, to: 'refresh#create'
    post :signup_verification, to: 'signup_verification#create'
  end

  get '/health' => 'health#index'
end
