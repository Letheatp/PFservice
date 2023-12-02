class AmazonItem < ApplicationRecord
  has_many :wishlist_items, foreign_key: "item_id", dependent: :destroy

  validates :name, presence: true
  validates :url, presence: true, uniqueness: true, format: /\A#{URI::regexp(%w(http https))}\z/
  validates :image_url, uniqueness: true, format: /\A#{URI::regexp(%w(http https))}\z/
  validates :price, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
