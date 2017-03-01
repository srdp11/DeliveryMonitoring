Rails.application.routes.draw do
  root 'main#index'

  resources :clients
  resources :records

  post 'records', to: 'records#create'
  put 'records', to: 'records#update'

  delete 'clients', to: 'clients#destroy'

  mount ActionCable.server => '/cable'
end
