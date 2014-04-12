get '/surveys/new' do
  erb :new_survey
end

post '/surveys' do
  if params[:type] == "submit"
    Survey.create(params)
  elsif params[:type] == "question"
    erb :_question, layout: false
  elsif params[:type] == "answer"
    erb :_answer, layout: false
  end
end