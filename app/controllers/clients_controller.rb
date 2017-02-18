class ClientsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    @phone_num = params[:phone_num]
    @records = Record.where(phone_num: @phone_num)

    mail_id_list = @records.pluck(:mail_id)
    @status_list = Hash[mail_id_list.collect { |mail_id| [mail_id, PrevStatus.where(mail_id: mail_id).pluck(:status)] }]
    puts @status_list
    render file: "app/views/clients/profile.html.erb"
  end
end
