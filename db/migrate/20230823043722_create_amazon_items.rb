class CreateAmazonItems < ActiveRecord::Migration[7.0]
  def change
    create_table :amazon_items do |t|
      t.string :name
      t.string :url
      t.integer :price

      t.timestamps
    end
  end
end
