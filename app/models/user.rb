class User < ActiveRecord::Base
  # This is Sinatra! Remember to create a migration!
  validates :username, presence: { message: "must be given please" }
  validates :email, presence: { message: "must be given please" }
  validates :username, uniqueness: { message: ->(object, data) do
                                       "Hey #{object.username}!, #{data[:value]} is taken already!"
  end }
  validates :email, uniqueness: true
end
