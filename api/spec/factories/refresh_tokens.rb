FactoryGirl.define do
  factory :refresh_token do
    user nil
    secret_hash 'MyString'
  end
end
