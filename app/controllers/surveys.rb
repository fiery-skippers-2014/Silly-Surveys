get '/surveys/new' do
  erb :new_survey
end

post '/surveys' do
  Survey.create(params)

end