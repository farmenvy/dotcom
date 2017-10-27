FactoryGirl.define do
  factory :refresh_token do
    secret 'secret'
    secret_hash { BCrypt::Password.create(secret) }
    user
  end
end
