class CreatePurchaseRecord < ActiveRecord::Migration[7.0]
  def change
    create_table :purchase_records do |t|
      t.references :user, null: false, foreign_key: true
      t.references :gameable, polymophic: true, null: false, foreign_key: true
      t.string :game_type, default: "default"
      t.integer :amount
      t.text :comment

      t.timestamps
    end
  end
end
