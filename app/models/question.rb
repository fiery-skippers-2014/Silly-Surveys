class Question < ActiveRecord::Base
  has_many :answers
  belongs_to :survey
  belongs_to :user
end
