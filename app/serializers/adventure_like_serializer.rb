class AdventureLikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :adventure_id, :adventure

  belongs_to :user
  belongs_to :adventure
end
