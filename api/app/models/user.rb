class User < ApplicationRecord
  EMAIL_ADDRESS_REGEX = /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  EMAIL_MSG = 'Please enter a valid email'.freeze
  PASSWORD_MSG = 'Must be between 6 and 100 characters'.freeze

  has_secure_password validations: false
  validates :email_address,
            format: {
              with: EMAIL_ADDRESS_REGEX,
              message: EMAIL_MSG
            },
            uniqueness: { message: 'This email has already been taken' }

  validate :burner_email
  validates :password,
            length: {
              minimum: 12,
              maximum: 100,
              message: PASSWORD_MSG
            }, if: :password

  validates :password, presence: { message: PASSWORD_MSG }, on: :create
  validates :role, inclusion: { in: %w[farmer user admin] }

  validates :first_name, presence: true
  validates :last_name, presence: true

  belongs_to :farm
  accepts_nested_attributes_for :farm

  private

  def burner_email
    result = ValidateEmail.call(email: email_address)
    errors.add(:email_address, EMAIL_MSG) unless result.success?
  end
end
