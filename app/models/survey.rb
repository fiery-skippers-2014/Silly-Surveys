class Survey < ActiveRecord::Base
  has_many :survey_interactions
  has_many :questions
  has_many :users, :through => survey_interactions
  # Remember to create a migration!
end
