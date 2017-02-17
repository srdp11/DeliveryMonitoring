class Record < ApplicationRecord
  validates :phone_num, format: /\A((\+7|7|8)+([0-9]){10})\z/
  validates :mail_id, numericality: {
     greater_than: 0
  }
end
