require 'mechanize'
require 'httparty'
require 'json'

class LinksController < ApplicationController
  def android
    render :text =>"_bfShowLinks(#{LinksLoader.android_links.to_json})"
  end

  def ios
    render :text => "_bfShowLinks(#{LinksLoader.ios_links.to_json})"
  end

  def get_google_store_data
    #  Get page details
    mechanize = Mechanize.new { |agent|
      agent.user_agent = request.env['HTTP_USER_AGENT']
      agent.request_headers = { 'Accept-Language' => request.env['HTTP_ACCEPT_LANGUAGE'] }
      agent.ssl_version = 'SSLv3'
      agent.verify_mode = OpenSSL::SSL::VERIFY_NONE
    }

    mechanize.get(params[:link]) do |page|
      @name = page.at('div[@class="document-title"]').text
      @image = page.at('img[@class="cover-image"]')[:src]
    end

    render :text => "_bfShowLink(#{ { :name => @name, :image => @image }.to_json })"
  end

  def get_itunes_data
    app_id = /id\d+/.match(params['link'])
    response = HTTParty.get("https://itunes.apple.com/lookup?id=#{app_id[0][2, app_id[0].length - 2]}")

    render :text => "_bfShowLink(#{ { :name => response['results'][0]['trackName'], :image => response['results'][0]['artworkUrl100'] }.to_json })"
  end

  def new_page

  end
end
