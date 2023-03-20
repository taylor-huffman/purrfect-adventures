class User < ApplicationRecord
    has_secure_password

    has_many :adventures, dependent: :destroy
    has_many :cats, -> { distinct }, through: :adventures, dependent: :destroy
    has_many :adventure_likes, dependent: :destroy
    # has_many :adventure_likes, through: :adventures

    validates :username, presence: true, uniqueness: true
    validates :bio, presence: true
end
