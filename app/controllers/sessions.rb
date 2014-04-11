get "/session/login" do
  erb :login
end

post "/session/login" do
  user = User.find_by_username(params[:username])

  if user.password == BCrypt::Engine.hash_secret(params[:password], user.salt)
    "you win"
  else
    "you lose"
  end
end

post "/session/sign-up" do
  salt = BCrypt::Engine.generate_salt
  User.create(
    username: params[:username],
    email: params[:email],
    password: BCrypt::Engine.hash_secret(params[:password], salt),
    password_salt: salt
    )
  redirect '/'
end