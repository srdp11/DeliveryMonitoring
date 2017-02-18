class Record < ApplicationRecord
  validates :phone_num, format: /\A((\+7|7|8)+([0-9]){10})\z/
  validates :mail_id, numericality: {
     greater_than: 0
  }

  before_update :save_status_changes, if: :status_changed?

  def save_status_changes
    PrevStatus.create(mail_id: self.mail_id, status: self.status_was, updated_at: self.updated_at_was)
  end
end
