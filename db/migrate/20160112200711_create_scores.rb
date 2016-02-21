class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :username, null: false
      t.integer :score, null: false
      t.date :date, null: false, default: Date.today

      t.timestamps null: false
    end
    add_index :scores, :score
    add_index :scores, :date
  end
end
