class ImmutabilityError < StandardError; end

class RefreshToken < ApplicationRecord
  belongs_to :user

  validates :secret, presence: true
  validate :force_immutable

  before_validation :encrypt_secret

  attr_accessor :secret

  def secure_compare(str)
    BCrypt::Password.new(secret_hash) == str
  end

  def payload
    raise ArgumentError, 'not persisted' unless persisted?
    build_payload
  end
  alias as_json payload

  def as_jwt
    JSONWebToken.encode(payload)
  end
  alias to_jwt as_jwt

  def build_cookie_args
    {
      value: secret,
      path: '/api/auth',
      same_site: :strict,
      expires: 30.days.from_now,
      httponly: true
    }
  end

  private

  def encrypt_secret
    self.secret ||= SecureRandom.hex(12)
    self.secret_hash = BCrypt::Password.create(secret)
  end

  def force_immutable
    return unless changed? && persisted?
    raise ImmutabilityError, 'RefreshTokens are immutable'
  end

  def build_payload
    {
      jti: id,
      iat: created_at.to_i,
      sub: user_id
    }.with_indifferent_access
  end
end
