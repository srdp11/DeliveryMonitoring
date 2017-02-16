class RecordsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @records = Record.all
  end

  def create
    @record = Record.new(record_params)

    if @record.save
      render json: @record
    else
      render json: @record_errors, status: :unprocessable_entity
    end
  end

  def update
    @record = Record.where(mail_id: params[:record][:mail_id])

    if @record.update(record_params)
      render json: @record
    else
      render json: @record_errors, status: :unprocessable_entity
    end
  end

  private

    def record_params
      params.require(:record).permit(:mail_id,
                                     :sender_address,
                                     :recipient_address,
                                     :status,
                                     :phone_num)
    end
end
