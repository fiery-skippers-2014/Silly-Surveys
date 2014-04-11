class CreateUserAnswers < ActiveRecord::Migration
  def change
    create_table :user_answers do |t|
      t.belongs_to :user
      t.belongs_to :answer
      t.timestamps
    end

  end
end
