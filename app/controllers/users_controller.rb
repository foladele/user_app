class UsersController < ApplicationController
  def index
  end

  def show
  	@user_id = params[:id]
  end

  def new
  end

  # def create
  # 	user = User.create(user_params)
  # 	render json: user
  # end

  # private

  # 	def user_params
  # 		params.require(:user).permit(:first_name, :last_name, :phone_number)
  # 	end
end
