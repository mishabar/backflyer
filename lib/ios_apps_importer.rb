require 'httparty'
require 'json'

class IOSAppsImporter
  def self.import_apps
    puts 'Importing iOS Apps List'
    puts 'Downloading...'
    response = HTTParty.get('https://itunes.apple.com/il/rss/topfreeapplications/limit=10/json')
    puts 'Parsing...'
    if (response['feed'].nil?)
      puts "Error occurred during download: #{response}"
    else
      apps = []
      response['feed']['entry'].each do |app|
        if app['link'].kind_of?(Array)
          url = app['link'][0]['attributes']['href']
        else
          url = app['link']['attributes']['href']
        end
        apps.push({'package_name' => app['im:name']['label'],
                   'title' => app['title']['label'],
                   'image' => app['im:image'][2]['label'],
                   'url' => url})
      end

      return {'links' => apps, 'date' => Time.now}
    end
  end
end