class AmazonItem < ApplicationRecord
  has_many :wishlist_items, foreign_key: "item_id", dependent: :destroy
end
