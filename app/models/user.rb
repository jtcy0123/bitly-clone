class User < ActiveRecord::Base
  # This is Sinatra! Remember to create a migration!
  validates :username, presence: { message: "must be given please" }
  validates :email, presence: { message: "must be given please" }
  validates :email, :format => { :with => /([^@\s]+)@([\w]+)\.([a-zA-Z]{2,})/, :message => "Invalid email" }
  validates :username, uniqueness: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6 }

end
