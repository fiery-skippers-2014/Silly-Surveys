class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |c|
      c.string :username
      c.string :password
      c.string :password_salt
      c.string :email

      c.timestamps
    end
  end
end
