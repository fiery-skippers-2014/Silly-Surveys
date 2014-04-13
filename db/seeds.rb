
  User.create( username: Faker::Name.name, password: "password", email: Faker::Internet.email  )
  Survey.create( title: Faker::Commerce.department )

# For testing the questions of multiple surveys
# survey_number = (1..5).to_a

 10.times do |time|
      question = Question.new(id: time+1 , description: Faker::Lorem.sentence, survey_id: 1)

      10.times  do |time|
        new_answer = Answer.new( answer: Faker::Lorem.word, question_id: question.id )

        new_answer.save!
      end

      2.times do

        #duplicate answers
        word = Faker::Lorem.word
       template_answer = Answer.new( answer: word, question_id: question.id )
       duplicate_answer = Answer.new( answer: word, question_id: question.id )

        #saving duplicate answers
        template_answer.save!
        duplicate_answer.save!
      end

      question.save!
end