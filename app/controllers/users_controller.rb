class UsersController < ApplicationController

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize
    skip_before_action :authorize, only: [:index, :create]

    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find(session[:user_id])
        render json: user
    end

    def create
        user = User.create!(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user
        else
            render :render_unprocessable_entity_response
        end
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :bio)
    end

    def authorize
        return render json: { errors: ["Whoops! Please log in to continue."] }, status: :unauthorized unless session.include? :user_id
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end
