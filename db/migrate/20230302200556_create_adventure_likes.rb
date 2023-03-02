class CreateAdventureLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :adventure_likes do |t|
      t.integer :user_id
      t.integer :adventure_id
      t.timestamps
    end
  end
end
