class Adventure < ApplicationRecord

    belongs_to :user
    belongs_to :cat
    has_many :adventure_likes, dependent: :destroy

    validates :title, presence: true
    validates :description, presence: true
    validates :location, presence: true
    validates :cat_id, presence: true
    validates :user_id, presence: true

    def total_likes
        self.adventure_likes.count
    end

end
