class AddImageUrlToAmazonItem < ActiveRecord::Migration[7.0]
  def change
    add_column :amazon_items, :image_url, :string
  end
end
