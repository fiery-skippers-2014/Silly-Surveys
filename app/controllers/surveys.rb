
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
              @answer_values = @answers.map {|answer| answer.answer}
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




