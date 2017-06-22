class CreateUrls < ActiveRecord::Migration[4.2]
  def change
    create_table :urls do |t|
      t.string :long_url
      t.string :short_url
      t.integer :click_count
      t.timestamps
    end
  end
end
