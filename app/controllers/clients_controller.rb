class ClientsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    @phone_num = params[:phone_num]
    @records = Record.where(phone_num: @phone_num)

    mail_id_list = @records.pluck(:mail_id)
    @status_list = Hash[mail_id_list.collect { |mail_id| [mail_id, PrevStatus.where(mail_id: mail_id).pluck(:status)] }]

    if @records.empty? || !Record.exists?(mail_id: params[:mail_id])
      render body: nil, status: 400, content_type: 'text/html'
    else
      render json: { phone_num: @phone_num, "records": @records, "status_list": @status_list }
    end
  end
end
