class AdventuresController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        adventures = Adventure.all
        render json: adventures
    end

    def create
        adventure = Adventure.create!(user_params)
        render json: adventure
    end

    def update
        adventure = Adventure.find(params[:id])
        adventure.update!(
            user_id: params[:user_id],
            cat_id: params[:cat_id],
            title: params[:title],
            description: params[:description],
            location: params[:location]
        )
        render json: adventure
    end

    def destroy
        adventure = Adventure.find(params[:id])
        adventure.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:user_id, :cat_id, :title, :description, :location)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
