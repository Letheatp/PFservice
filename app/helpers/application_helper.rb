module ApplicationHelper
  def sum_amount(user)
    return if user.nil?
    user.purchase_records.sum(:amount)
  end
end
