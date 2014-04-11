get "/session/login" do
  erb :login
end

post "/session/login" do
  user = User.find_by_username(params[:username])

  if user.password == BCrypt::Engine.hash_secret(params[:password], user.password_salt)
    session[:user_id] = user.id

    redirect "/user/#{session[:user_id]}"
  else
    "<h1>you suck</h1>" #BUGBUG
  end
end

post "/session/sign-up" do
  salt = BCrypt::Engine.generate_salt
  user = User.create(
    username: params[:username],
    email: params[:email],
    password: BCrypt::Engine.hash_secret(params[:password], salt),
    password_salt: salt
    )

  session[:user_id] = user.id
  redirect "/user/#{session[:user_id]}"
end