class AdventureLikesController < ApplicationController

    def index
        adventure_likes = AdventureLike.all
        render json: adventure_likes
    end

    def create
        adventure_like = AdventureLike.create!(user_params)
        render json: adventure_like
    end

    private

    def user_params
        params.permit(:user_id, :adventure_id)
    end

end
