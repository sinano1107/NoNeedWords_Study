Rails.application.routes.draw do
  get '/' => 'move#index'
  get 'move/make_card' => 'move#make_card'
  get 'move/study_menu' => 'move#study_menu'
  get 'move/list' => 'move#list'
  get 'move/study/:questions/:language/:format' => 'move#study'
  get 'move/test' => 'move#test'
  get 'move/election/:count/:box/:error' => 'move#election'

  post 'processing/make_card' => 'processing#make_card'
  post 'processing/study_preparation' => 'processing#study_preparation'
  post 'processing/election_processing/:count/:box' => 'processing#election_processing'
  post 'processing/finishing/:questions' => 'processing#finishing'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
