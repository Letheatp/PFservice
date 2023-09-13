module ApplicationHelper
  def sum_amount(user)
    user.purchase_records.sum(:amount)
  end
end
