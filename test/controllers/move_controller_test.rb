require 'test_helper'

class MoveControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get move_index_url
    assert_response :success
  end

end
