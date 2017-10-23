class AddPendingVerificationToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :pending_verification, :boolean, default: true
    add_column :users, :role, :string, null: false, default: 'user'
  end
end
