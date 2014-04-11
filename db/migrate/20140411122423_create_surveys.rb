class CreateSurveys < ActiveRecord::Migration
  def change
    create_table :surveys do |col|
      col.string :title
      col.timestamps
    end
  end
end
