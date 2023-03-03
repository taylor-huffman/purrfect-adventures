class Adventure < ApplicationRecord

    belongs_to :user
    belongs_to :cat
    has_many :adventure_likes

    def total_likes
        self.adventure_likes.count
    end

end
