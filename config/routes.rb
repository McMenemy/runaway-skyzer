Rails.application.routes.draw do

  root to: 'static_pages#root'

  resources :scores, only:  [:create]

end
