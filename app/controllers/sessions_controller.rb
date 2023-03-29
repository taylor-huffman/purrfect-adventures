class SessionsController < ApplicationController
    
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    before_action :authorize
    skip_before_action :authorize, only: :create
    
        def create
            user = User.find_by(username: params[:username])
            if user&.authenticate(params[:password])
                session[:user_id] = user.id
                render json: user, status: :created
            else
                render json: { errors: ["Invalid username or password"] }, status: :unauthorized
            end
        end
    
        def destroy
            session.delete :user_id
            head :no_content
        end
    
        private
        
        def authorize
            return render json: { errors: ["Sorry, you're not authorized"] }, status: :unauthorized unless session.include? :user_id
        end

        def render_unprocessable_entity_response(invalid)
            render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
        end

end
