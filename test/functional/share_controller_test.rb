require 'test_helper'

class ShareControllerTest < ActionController::TestCase
  test "should get sample" do
    get :sample
    assert_response :success
  end

end
