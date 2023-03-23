class SessionsController < ApplicationController
    
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    
        def create
            user = User.find_by(username: params[:username])
            if user&.authenticate(params[:password])
                session[:user_id] = user.id
                render json: user, status: :created
            else
                render json: { errors: ["Invalid email or password"] }, status: :unauthorized
            end
        end
    
        def destroy
            session.delete :user_id
            head :no_content
        end
    
        private
        
        def render_unprocessable_entity_response(invalid)
            render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
        end

end
