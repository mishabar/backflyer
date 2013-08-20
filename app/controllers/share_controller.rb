class ShareController < ApplicationController
  def sample
    puts request.env['HTTP_USER_AGENT']
  end
end
