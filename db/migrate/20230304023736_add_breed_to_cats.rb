class AddBreedToCats < ActiveRecord::Migration[6.1]
  def change
    add_column :cats, :breed, :string
  end
end
