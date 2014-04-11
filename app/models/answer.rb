class Answer < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :question
  has_many :user_answers
  has_many :users, through: :user_answers
end
