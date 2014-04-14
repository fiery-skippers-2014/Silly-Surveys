post '/surveys' do
  survey = Survey.create(
    title: params[:title]
    )
  questions = Question.where(user_id: session[:user_id])

  questions.each do |question|
    question.update_attribute(:survey_id,survey.id)
  end

  SurveyInteraction.create(
    user_id: session[:user_id],
    survey_id: survey.id,
    creator: true
    )
  redirect "user/#{session[:user_id]}"
end

get '/surveys/new' do
  if session[:user_id]
    erb :new_survey
  else
    redirect '/session/login'
  end
end

get '/surveys/questions/new' do
  @question = Question.last
  @answers = @question.answers

  erb :_formatted_question, layout: false
end

post "/surveys/questions" do
  question = Question.create(
    description: params[:description],
    user_id: session[:user_id]
    )
  3.times do |x|
    x += 1
    answer = "answer#{x}".to_s
    Answer.create(
      answer: params[answer],
      question_id: question.id
      )
    
  end
  redirect '/surveys/questions/new'
end

get '/surveys/question/new' do
  erb :_question, layout: false
end



