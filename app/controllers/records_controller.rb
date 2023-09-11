class RecordsController < ApplicationController
  before_action :set_record, only: %i[show destroy]

  def index
    @records = current_user.purchase_records
  end

  def show

  end

  def new
    @record_form = PurchaseRecordForm.new
  end

  def create
    @record_form = PurchaseRecordForm.new(form_params)

    if @record_form.valid?
      game_id = @record_form.game_id
      game = current_user.available_games[game_id]
      amount = @record_form.amount
      comment = @record_form.comment

      current_user.record_purchase(game, amount, comment)

      flash[:success] = "記録しました"
      redirect_to root_path
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
    @record.destroy!
    flash[:danger] = "削除しました"
    redirect_to records_path
  end

  private

  def form_params
    conv_params = params.require(:purchase_record_form).permit(:game_id, :amount, :comment)
    conv_params[:game_id] = conv_params[:game_id].to_i
    conv_params[:amount] = conv_params[:amount].to_i
    conv_params[:user_id] = current_user.id
    return conv_params
  end

  def set_record
    @record = PurchaseRecord.find(params[:id])
  end
end
