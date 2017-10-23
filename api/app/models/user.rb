class User < ApplicationRecord
  EMAIL_ADDRESS_REGEX = /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

  has_secure_password
  validates :email_address,
            format: { with: EMAIL_ADDRESS_REGEX },
            uniqueness: true

  validate :burner_email
  validates :password, length: { minimum: 12, maximum: 100 }, if: :password
  validates :role, inclusion: { in: %w[farmer user admin] }

  validates :first_name, presence: true
  validates :last_name, presence: true

  belongs_to :farm
  accepts_nested_attributes_for :farm

  private

  def burner_email
    result = ValidateEmail.call(email: email_address)
    errors.add(:email_address, 'is invalid') unless result.success?
  end
end
