class CreateRecords < ActiveRecord::Migration[5.0]
  def change
    create_table :records do |t|
      t.integer :mail_id
      t.string :sender_address
      t.string :recipient_address
      t.string :status
      t.string :phone_num

      t.timestamps
    end
  end
end
