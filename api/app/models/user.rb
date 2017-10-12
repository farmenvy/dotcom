class User < ApplicationRecord
  EMAIL_ADDRESS_REGEX = /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  has_secure_password
  validates :email_address, format: { with: EMAIL_ADDRESS_REGEX }, uniqueness: true
  validates :password, length: { minimum: 12, maximum: 100 }, if: :password
end
