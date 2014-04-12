get '/user/:id'  do
  @surveys = Survey.all
  erb :user_profile
end