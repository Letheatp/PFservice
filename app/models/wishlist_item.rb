class WishlistItem < ApplicationRecord
  belongs_to :wishlist
  belongs_to :amazon_item, foreign_key: "item_id"
end
