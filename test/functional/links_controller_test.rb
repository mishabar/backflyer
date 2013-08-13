require 'test_helper'

class LinksControllerTest < ActionController::TestCase
  test "should get android" do
    get :android
    assert_response :success
  end

  test "should get ios" do
    get :ios
    assert_response :success
  end

end
