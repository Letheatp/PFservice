class UserSessionsController < ApplicationController
  skip_before_action :require_login, except: %i[destroy]

  def new
    @user = User.new
  end

  def create
    @user = login(params[:email], params[:password])

    if @user
      redirect_back_or_to(root_path, success: 'ログインに成功しました')
    else
      flash[:danger] = 'ログインに失敗しました'
      redirect_to login_path
    end
  end

  def destroy
    logout
    redirect_to(login_path, success: 'ログアウトしました', status: :see_other)
  end
end
