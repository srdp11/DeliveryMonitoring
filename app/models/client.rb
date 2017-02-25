class Client < ApplicationRecord
  def self.authenticate(phone_num, mail_id)
    client = Record.find_by_mail_id_and_phone_num(mail_id, phone_num)

    if client
      client
    else
      nil
    end
  end
end
