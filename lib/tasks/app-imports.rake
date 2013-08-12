task :import_android_apps => :environment do
  AndroidAppsImporter.import_apps
end

task :import_ios_apps => :environment do
  IOSAppsImporter.import_apps
end