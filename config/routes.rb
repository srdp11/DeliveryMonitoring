Rails.application.routes.draw do
  resources :records
  post 'records', to: 'records#create'
end
