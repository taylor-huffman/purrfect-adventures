class Cat < ApplicationRecord

    has_many :adventures, dependent: :destroy
    has_many :users, through: :adventures

    validates :name, presence: true
    validates :birthdate, presence: true
    validates :breed, presence: true
    validates :favorite_toy, presence: true

end
