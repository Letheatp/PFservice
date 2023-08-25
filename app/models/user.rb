class User < ApplicationRecord
  authenticates_with_sorcery!

  has_many :purchase_records, dependent: :destroy
  has_many :user_games, dependent: :destroy
  has_many :wishlists, dependent: :destroy

  validates :password, length: { minimum: 6 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  validates :email, presence:true, uniqueness: true
  validates :name, presence: true, length: { maximum: 12 }

  def create_user_game(title)
    self.user_games.create!(
      title: title
    )
  end

  def record_purchase(game, price, comment = nil)
    game.purchase_records.create!(
      user_id: id,
      price: price,
      comment: comment
    )
  end
end
