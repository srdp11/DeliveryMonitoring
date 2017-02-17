class ClientsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    @phone_num = params[:phone_num]
    @records = Record.where(phone_num: @phone_num)
    render file: "app/views/clients/profile.html.erb"
  end
end
