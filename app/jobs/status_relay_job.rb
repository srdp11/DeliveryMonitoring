class StatusRelayJob < ApplicationJob
  def perform(record)
    status_list = { record.mail_id => PrevStatus.where(mail_id: record.mail_id).pluck(:status) }
    ActionCable.server.broadcast("mich_channel:#{record.phone_num}", data: { record: record, status_list: status_list })
  end
end
