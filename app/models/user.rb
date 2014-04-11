class User < ActiveRecord::Base
  # Remember to create a migration!
  has_many :survey_interactions
  has_many :surveys, through: :survey_interactions

  has_many :user_answers
  has_many :answers, through: :user_answers

end
