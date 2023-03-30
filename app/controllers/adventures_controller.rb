class AdventuresController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize

    def index
        adventures = Adventure.all
        render json: adventures
    end

    def create
        # if params[:user_id] == session[:user_id]
        #     adventure = Adventure.create!(user_params)
        #     render json: adventure
        # else
        #     render json: { errors: ["Sorry, you're not authorized"] }, status: :unauthorized
        # end
        user = User.find(session[:user_id])
        adventure = user.adventures.create!(user_params)
        render json: adventure
    end

    def update
        # adventure = Adventure.find(params[:id])
        # if params[:user_id] == session[:user_id]
        #     adventure.update!(user_params)
        #     render json: adventure
        # else
        #     render json: { errors: ["Sorry, you're not authorized"] }, status: :unauthorized
        # end
        user = User.find(session[:user_id])
        adventure = user.adventures.find(params[:id])
        adventure.update!(user_params)
        render json: adventure
    end

    def destroy
        user = User.find(session[:user_id])
        adventure = user.adventures.find(params[:id])
        adventure.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:user_id, :cat_id, :title, :description, :location)
    end

    def authorize
        return render json: { errors: ["Sorry, you're not authorized"] }, status: :unauthorized unless session.include? :user_id
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def render_not_found_response(error)
        render json: { errors: [error.message] }, status: :not_found
    end

end
