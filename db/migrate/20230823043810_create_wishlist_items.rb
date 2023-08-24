class CreateWishlistItems < ActiveRecord::Migration[7.0]
  def change
    create_table :wishlist_items do |t|
      t.references :wishlist, null: false, foreign_key: true
      t.integer :item_id, index: true

      t.timestamps
    end
    add_foreign_key :wishlist_items, :amazon_items, column: :item_id
  end
end
