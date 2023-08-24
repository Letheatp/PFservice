class PurchaseRecord < ApplicationRecord
  belongs_to :gameable, polymorphic: true
end
