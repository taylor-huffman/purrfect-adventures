class Adventure < ApplicationRecord

    belongs_to :user
    belongs_to :cat
    has_many :adventure_likes

end
