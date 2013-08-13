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
      begin
        puts 'Saving to file (#{Dir.pwd}/public/links/android.json)...'
        file = File.open("#{Dir.pwd}/public/links/android.json", 'w:UTF-8')
        file.write("_bfShowLinks({\"links\":#{apps.to_json}, \"date\": \"#{Time.now}\"})")
        puts "File saved"
      rescue IOError => e
        #some error occur, dir not writable etc.
        puts "Error occurred during download: #{e.message}"
      ensure
        file.close unless file == nil
      end
    end
  end
end