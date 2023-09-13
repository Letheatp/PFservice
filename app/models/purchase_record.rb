class PurchaseRecord < ApplicationRecord
  belongs_to :gameable, polymorphic: true

  validates :amount, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 0}

  def game_title
    gameable.title
  end
end
