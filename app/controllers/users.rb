get '/user/:id'  do
  @surveys = Survey.all
  erb :user_profile
end

get '/users/session-id' do
  if session[:user_id]
    content_type :json
    { user_id: session[:user_id] }.to_json
  end
end