Backflyer::Application.routes.draw do
  get 'share/sample'

  get 'links/android'
  get 'links/ios'

  get 'links/new_page'
  match 'links/itunes' => 'links#get_itunes_data'
  match 'links/google' => 'links#get_google_store_data'

end
