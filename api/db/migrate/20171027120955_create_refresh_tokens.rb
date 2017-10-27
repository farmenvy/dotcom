class CreateRefreshTokens < ActiveRecord::Migration[5.1]
  def change
    create_table :refresh_tokens do |t|
      t.references :user, foreign_key: true
      t.string :secret_hash

      t.timestamps
    end
  end
end
