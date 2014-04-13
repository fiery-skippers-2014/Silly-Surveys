class User < ActiveRecord::Base
  # Remember to create a migration!
  has_many :interactions, :foreign_key => 'user_id', :class_name => "SurveyInteraction"
  has_many :surveys, through: :interactions

  has_many :user_answers
  has_many :answers, through: :user_answers

  has_many :questions

end
