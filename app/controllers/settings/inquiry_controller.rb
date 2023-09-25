class Settings::InquiryController < SettingsController
  def show
    if request.xhr?
      render partial: 'partial', layout: false
    end
  end

  def create

  end
end