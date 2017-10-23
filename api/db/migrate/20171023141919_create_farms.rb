class CreateFarms < ActiveRecord::Migration[5.1]
  def up
    create_table :farms do |t|
      t.string :name, null: false, index: true

      t.timestamps
    end
  end
end
