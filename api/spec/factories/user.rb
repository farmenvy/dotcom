FactoryGirl.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    sequence(:email_address) { |n| "user#{n}@gmail.com" }
    password { 'thisisavalidpassword' }
    password_confirmation { 'thisisavalidpassword' }
    pending_verification { false }
    role { 'farmer' }
    farm
  end
end
