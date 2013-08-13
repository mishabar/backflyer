class LinksLoader
  @@android = nil
  @@ios = nil

  def self.android_links
    if (@@android.nil? || @@android['date'] < Time.now - 1.hours)
      apps = AndroidAppsImporter.import_apps
      unless apps.kind_of?(String)
        @@android = apps
      end
    end

    return @@android
  end

  def self.ios_links
    if (@@ios.nil? || @@ios['date'] < Time.now - 1.hours)
      apps = IOSAppsImporter.import_apps
      unless apps.kind_of?(String)
        @@ios = apps
      end
    end

    return @@ios
  end
end