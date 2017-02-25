class MainController < ApplicationController
  def index
    @operator_records = Record.all

    @client_records = Record.where(phone_num: @phone_num)
    mail_id_list = @client_records.pluck(:mail_id)
    @status_list = Hash[mail_id_list.collect { |mail_id| [mail_id, PrevStatus.where(mail_id: mail_id).pluck(:status)] }]
  end
end
