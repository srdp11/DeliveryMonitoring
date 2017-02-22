#ActiveSupport.halt_callback_chains_on_return_false = true

class Record < ApplicationRecord
  attr_readonly :mail_id

  validates :phone_num, format: /\A((\+7|7|8)+([0-9]){10})\z/
  validates :mail_id, numericality: {
     greater_than: 0
  }

  after_commit :notify_client
  before_update :check_status
  before_update :save_status_changes, if: :status_changed?


  private
  def check_status
    if self.status_was == "Delivered"
      errors.add(:base, "Status is Delivered!")
      throw(:abort)
    end
  end

  def save_status_changes
    PrevStatus.create(mail_id: self.mail_id, status: self.status_was, updated_at: self.updated_at_was)
  end

  def notify_client
    StatusRelayJob.perform_now(self)
  end
end
