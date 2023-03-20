class CatsController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

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
        cat = Cat.order(Arel.sql('RANDOM()')).first
        render json: cat
    end

    private

    def user_params
        params.permit(:name, :birthdate, :favorite_toy, :breed)
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
