class ApplicationController < ActionController::Base
  before_action :config_js_toasts

  def config_js_toasts
    @js_toasts = nil
  end
end
