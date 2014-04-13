class Survey < ActiveRecord::Base
  has_many :interactions, :foreign_key => 'survey_id', :class_name => "SurveyInteraction"
  has_many :users, through: :interactions
  has_many :questions
  # Remember to create a migration!
end
