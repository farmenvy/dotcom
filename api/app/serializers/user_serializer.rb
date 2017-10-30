class UserSerializer < ActiveModel::Serializer
  attributes :id,
    :first_name,
    :last_name,
    :email_address,
    :role,
    :created_at,
    :updated_at,
    :farm_attributes

  def farm_attributes
    object.farm
  end
end
