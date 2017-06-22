get '/' do
  if Url.all.length == 0
    @url = {long_url: "", short_url: "", click_count: ""}
  else
    @url = Url.last
  end
  erb :"static/index"
end

get '/signup' do
  erb :"static/signup"
end

post '/create_user' do
  p params
  @user = User.new(params.first(3).to_h)
  if @user.save
    redirect '/'
  else
    erb :"static/signup"
  end
end

post '/shorten_link' do
  if Url.exists?(long_url: params[:long_url])
    return Url.find_by_long_url(params[:long_url]).to_json
  else
    @url = Url.new(long_url: params[:long_url])
    if @url.save
      return @url.to_json
    else
      return @url.errors.full_messages.join('. ')
    end
  end
end

get '/:short_url' do
  @url = Url.find_by(short_url: params[:short_url])
  @url.click_count += 1
  @url.save
  redirect @url.long_url
end
