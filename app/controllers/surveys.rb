get '/survey/details' do

  # the first question of the survey
  @question = Survey.find(params[:type]).questions[0]

  # all the answers tied to that question
  @answers = @question.answers

  # all the answer_values of those answers
  @answer_values = @answers.map {|answer| answer.answer}
  puts "#{@answer_values}"

  #all the unique answer values of that
  @unique_answer_values = @answer_values.uniq
  puts "#{@unique_answer_values}"

  #calculating the times that the unique answer_values are answered
  #an array to store the frequency of the answers
  @answer_frequency = []
  @answer_values.each do |answer_value|
     count = 0
     @unique_answer_values.each {|unique_answer| count += 1 if answer_value == unique_answer }
     puts("#{count}")
     @answer_frequency.push(count)
  end
  puts "#{@answer_frequency}"

  #return the answer frequency
  @answer_frequency.join(",")
end