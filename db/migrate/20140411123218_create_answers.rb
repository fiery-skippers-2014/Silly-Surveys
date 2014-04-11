class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |c|
      c.string :answer
      c.belongs_to :question

      c.timestamps
    end
  end
end
