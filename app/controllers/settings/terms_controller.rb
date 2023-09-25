class Settings::TermsController < SettingsController
  def show
    if request.xhr?
      render partial: 'partial', layout: false
    end
  end
end