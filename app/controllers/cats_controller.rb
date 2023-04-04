class CatsController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize

    def index
        cats = Cat.all
        render json: cats
    end

    def create
        cat = Cat.create!(user_params)
        render json: cat
    end

    def destroy
        cat = Cat.find(params[:id])
        cat.destroy
        head :no_content
    end

    def random
        cat = Cat.random_cat
        render json: cat
    end

    private

    def user_params
        params.permit(:name, :birthdate, :favorite_toy, :breed)
    end

    def authorize
        return render json: { errors: ["Sorry, you're not authorized"] }, status: :unauthorized unless session.include? :user_id
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
