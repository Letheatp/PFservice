class CreateAmazonItems < ActiveRecord::Migration[7.0]
  def change
    create_table :amazon_items do |t|
      t.string :name, null: false
      t.string :url, null: false, unique: true
      t.integer :price, null: false

      t.timestamps
    end
  end
end
