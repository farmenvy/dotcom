class AddFarmReferenceToUsers < ActiveRecord::Migration[5.1]
  def change
    add_reference :users, :farm, foreign_key: true
  end
end
