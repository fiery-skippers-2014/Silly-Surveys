class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :description
      t.belongs_to :survey

      t.timestamp
    end
  end
end
