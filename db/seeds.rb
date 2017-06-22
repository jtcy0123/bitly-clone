require 'csv'

csv_text = File.read('db/urls.csv')
csv = CSV.parse(csv_text, :encoding => 'ISO-8859-1')
csv.each do |row|
  url = Url.create(long_url: row[0][1..-2])
  url.save
end
