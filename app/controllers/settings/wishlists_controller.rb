class Settings::WishlistsController < SettingsController
  def show

  end

  def index
    if request.xhr?
      render partial: 'wishlists', layout: false
    end
  end

  def create
    respond_to do |format|
      format.json do
        wishlist = current_user.wishlists.build(url: params[:url])
        if wishlist.save
          render json: { status: :ok } 
        else
          render json: { error: wishlist.errors, status: :unprocessable_entity } 
        end
      end
    end
  end

  def update
    respond_to do |format|
      format.json do
        wishlist = current_user.wishlists.find(params[:id])
        if wishlist.update(url: params[:url])
          render json: { status: :ok } 
        else
          render json: { error: wishlist.errors, status: :unprocessable_entity } 
        end
      end
    end
  end
end