class CreatePrevStatuses < ActiveRecord::Migration[5.0]
  def change
    create_table :prev_statuses do |t|
      t.integer :mail_id
      t.string :status
      t.datetime :updated_at
    end
  end
end
