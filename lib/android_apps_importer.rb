require 'httparty'
require 'json'

class AndroidAppsImporter
  def self.import_apps
    puts 'Importing Android apps list'
    puts 'Downloading...'
    response = HTTParty.get('http://dev.appaware.com/1/app/top.json?d=day&t=popular&c=1&cc=IL&num=10&page=1&client_token=efb5386949686940928b097234ffa55b54835412')
    puts 'Parsing...'
    if (response['results'].nil?)
      puts "Error occurred during download: #{response['message']}"
    else
      apps = []
      response['results'].each do |app|
        apps.push({'package_name' => app['package_name'],
                   'title' => app['name'],
                   'image' => app['icon'],
                   'url' => app['market_url']})
      end

      return {'links' => apps, 'date' => Time.now}
    end
  end
end