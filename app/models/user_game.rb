class UserGame < ApplicationRecord
  has_many :purchase_records, as: :gameable, dependent: :destroy

  validates :title, presence: true
end
