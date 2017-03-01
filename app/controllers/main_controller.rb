class MainController < ApplicationController
  def index
    @operator_records = Record.all
    @is_auth = session[:phone_num] != nil

    if session[:phone_num]
      @mail_id = session[:mail_id]
      @phone_num = session[:phone_num]

      @records = Record.where(phone_num: session[:phone_num])
      mail_id_list = @records.pluck(:mail_id)
      @status_list = Hash[mail_id_list.collect { |mail_id| [mail_id, PrevStatus.where(mail_id: mail_id).pluck(:status)] }]
    end
  end
end
