require 'test_helper'

class ProcessingControllerTest < ActionDispatch::IntegrationTest
  test "should get test" do
    get processing_test_url
    assert_response :success
  end

end
