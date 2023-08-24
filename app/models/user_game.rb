class UserGame < ApplicationRecord
  has_many :purchase_records, as: :gameable, dependent: :destroy
end
