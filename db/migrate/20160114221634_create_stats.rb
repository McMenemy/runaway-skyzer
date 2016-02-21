class CreateStats < ActiveRecord::Migration
  def change
    create_table :records do |t|
      t.string :name, null: false
      t.integer :value, null: false, default: 0

      t.timestamps null: false
    end
    add_index :records, :name
  end
end
