class PurchaseRecordForm
  include ActiveModel::Model

  attr_accessor :game_id, :amount, :comment, :user_id

  validates :game_id, presence: true, numericality: { only_integer: true }
  validates :amount, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 0}

  private

  def validate_game_id_is_available
    current_user = User.find(user_id)
    is_valid = (game_id >= 0) && (game_id < current_user.available_games.length)
    errors.add(:game_id, "の値が範囲外です")
  end
end
