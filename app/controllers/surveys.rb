get '/surveys/new' do
  erb :new_survey
end

get '/surveys/questions/new' do
  @question = Question.last

  erb :_formatted_question
end

post "/surveys/questions" do
  question = Question.create(
    description: params[:description],
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



