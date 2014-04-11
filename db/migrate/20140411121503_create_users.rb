class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |c|
      c.string :username
      c.string :password
      c.string :email

      t.timestamps
    end
  end
end
