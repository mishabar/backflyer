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
    xml = HTTParty.get(URI::escape("http://ads.appia.com/v2/getAds?id=571&password=XXGZVOSEURVRRQSNNQPV9XIJ1F&siteId=4140&categoryId=5,7,9,17,19,21,24&adTypeId=6&totalCampaignsRequested=5&sessionId=#{request.session_options[:id]}&userAgentHeader=#{request.env['HTTP_USER_AGENT']}&ipAddress=189.76.27.190"))
    ##{request.env['REMOTE_ADDR']}
    @ads = xml['ads']['ad']
  end
end
