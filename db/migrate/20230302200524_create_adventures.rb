class CreateAdventures < ActiveRecord::Migration[6.1]
  def change
    create_table :adventures do |t|
      t.integer :user_id
      t.integer :cat_id
      t.string :title
      t.string :description
      t.string :location
      t.timestamps
    end
  end
end
