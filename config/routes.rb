Rails.application.routes.draw do
  root 'main#index'
  resources :clients
  resources :records
  post 'records', to: 'records#create'
  put 'records', to: 'records#update'
end
