class Wishlist < ApplicationRecord
  belongs_to :user
  has_many :wishlist_items, dependent: :destroy

  validates :url, presence:true, uniqueness: true, format: /\A#{URI::regexp(%w(http https))}\z/
end
