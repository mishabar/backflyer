require 'json'

class LinksController < ApplicationController
  def android
    render :text =>"_bfShowLinks(#{LinksLoader.android_links.to_json})"
  end

  def ios
    render :text => "_bfShowLinks(#{LinksLoader.ios_links.to_json})"
  end
end
