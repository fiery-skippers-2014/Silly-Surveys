5.times do |time|
  User.create( username: Faker::Name.name, password: "password", email: Faker::Internet.email  )
  Survey.create( title: Faker::Commerce.department )
  end

survey_number = (1..5).to_a

 10.times do
      question = Question.new( description: Faker::Lorem.sentence, survey_id: survey_number.sample)
      10.times  do
        Answer.create( answer: Faker::Lorem.word, question: question.id )
      end
      question.save!
end