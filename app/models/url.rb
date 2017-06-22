class Url < ActiveRecord::Base
  # This is Sinatra! Remember to create a migration!
  before_create :shorten, :counter
  validates :long_url, :format => URI::regexp(%w(http https))
  ##how to prompt error msg again?

  def shorten
    randnum = SecureRandom.hex(3)
    self.short_url = "#{randnum}"
  end

  def counter
    self.click_count = 0
  end
end
