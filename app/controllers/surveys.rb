get '/' do 
  @surveys = Survey.all
  erb :home
end


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
post '/surveys/new' do
  selected_answers = params[:answers].collect { |answer_id| Answer.find(answer_id) }.flatten
  selected_answers.each {|answer| answer.update_attribute(:count, answer.count + 1)}
  redirect '/'
end

get '/surveys/survey/:id' do
  @survey = Survey.find(params[:id])
  erb :single_survey
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

get '/survey/details' do
  unique_answer_values_and_frequencies = []
  questions = Survey.find(params[:type]).questions

  questions.each_with_index do |question,index|
    answer_counts = question.answers.map(&:count)
    answer_string = build_survey_answer_string(answer_counts)
    unique_answer_values_and_frequencies[index] = answer_string
  end

  unique_answer_values_and_frequencies.join(";")
end


def build_survey_answer_string answer_counts
  unique_answer_values = answer_counts.uniq
  answer_frequency = build_answer_frequency(answer_counts, unique_answer_values)
  unique_answer_values.zip(answer_frequency).join(',')
end

def build_answer_frequency(answer_counts, unique_answer_values)
  answer_frequency = []
  unique_answer_values.each_with_index do |unique_answer, index|
    count = 0
    answer_counts.each do |answer_value|
      count += 1 if answer_value == unique_answer
    end
    answer_frequency[index] = count
  end
  answer_frequency
end
