class CreateSurveyInteractions < ActiveRecord::Migration
  def change
    create_table :survey_interactions do |c|
      c.boolean :creator, default: false
      c.belongs_to :user
      c.belongs_to :survey

      c.timestamps
    end
  end
end
