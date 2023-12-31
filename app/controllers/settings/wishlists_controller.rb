class Settings::WishlistsController < SettingsController
  def show
    wishlist = current_user.wishlists.find(params[:id])
    items = wishlist.amazon_items
    if request.xhr?
      respond_to do |format|
        format.json do
          render json: items
        end
      end
    end
  end

  def index
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

  def destroy
    respond_to do |format|
      format.json do
        wishlist = current_user.wishlists.find(params[:id])
        wishlist.destroy!
        render json: { status: :ok }
      end
    end
  end
end