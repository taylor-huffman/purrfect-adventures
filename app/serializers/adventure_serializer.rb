class AdventureSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :cat_id, :cat, :user, :title, :description, :location, :total_likes, :created_at

  belongs_to :user
  belongs_to :cat
  has_many :adventure_likes
end
