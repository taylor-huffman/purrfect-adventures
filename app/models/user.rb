class User < ApplicationRecord
    has_secure_password

    has_many :adventures
    has_many :cats, through: :adventures
    has_many :adventure_likes, through: :adventures
end
