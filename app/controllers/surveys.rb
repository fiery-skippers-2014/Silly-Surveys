get '/surveys/new' do
  erb :new_survey
end

post "/charles" do
  question = Question.create(
    description: params[:description],
    )
  answer1 = Answer.create(
    answer: params[:answer1],
    question_id: question.id
    )
  answer2 = Answer.create(
    answer: params[:answer2],
    question_id: question.id
    )
  answer3 = Answer.create(
    answer: params[:answer3],
    question_id: question.id
    )
  "true"
end

get '/surveys/question/new' do
  erb :_question
end



