Rails.application.routes.draw do
  resources :records
  post 'records', to: 'records#create'
  put 'records', to: 'records#update'
end
