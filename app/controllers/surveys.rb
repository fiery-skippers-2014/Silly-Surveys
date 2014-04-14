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
  @answer = Answer.find(params[:choice])
  vote_count = @answer.count + 1
  @answer.update_attribute(:count, vote_count)
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

  # the first question of the survey
  @questions = Survey.find(params[:type]).questions

  # The array that stores the unique answers and frequencies to all the questions
  @unique_answer_values_and_frequencies = []

  # a loop that iterates through all the questions
  @questions.each_with_index do |question,index|

              # all the answers tied to that question
              @answers = question.answers

              # all the answer_values of those answers
              @answer_values = @answers.map {|answer| answer.count}
              # puts "#{@answer_values}"

              #all the unique answer values of that question
              @unique_answer_values = @answer_values.uniq
              # puts "#{@unique_answer_values}"



              #calculating the times that the unique answer_values are answered
              #an array to store the frequency of the answers
              @answer_frequency = []
              @unique_answer_values.each_with_index do |unique_answer,index|
                 count = 0
                 @answer_values.each do |answer_value|
                       count += 1 if answer_value == unique_answer
                  end

                 # puts("#{count}")

                 @answer_frequency[index] = count
              end
              puts "#{@answer_frequency}"


              @u_answers_n_freq = @unique_answer_values.zip(@answer_frequency)
              answer_string = @u_answers_n_freq.join(",")
              @unique_answer_values_and_frequencies[index] = answer_string

      end


   # puts "#{@unique_answer_values_and_frequencies}"
  #return the answer frequency
  @unique_answer_values_and_frequencies.join(";")

end
