class CatSerializer < ActiveModel::Serializer
  attributes :id, :name, :birthdate, :favorite_toy

  has_many :adventures
  has_many :users, through: :adventures
end
