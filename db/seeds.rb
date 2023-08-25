# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

USER_NUM = 20
WISHLIST_NUM = 60
ITEM_NUM = 100
GAME_NUM = 50

GAME_NUM.times do
  title = Faker::Game.unique.title
  Game.create!(
    title: title
  )
end

USER_NUM.times do
  user = User.create!(
    name: Faker::Name.unique.first_name,
    email: Faker::Internet.unique.email,
    password: "password",
    password_confirmation: "password",
  )

  3.times do |n|
    title = user.name + "'s Game" + (n+1).to_s
    user.create_user_game(
      title
    )
  end
end

ITEM_NUM.times do
  goods_name = Faker::Commerce.unique.product_name.gsub(" ", "")
  url = "https://www.amazon.co.jp/" + goods_name
  AmazonItem.create!(
    name: goods_name,
    url: url,
    price: rand(10000) + 1,
  )
end

WISHLIST_NUM.times do |n|
  user_id = rand(USER_NUM) + 1
  wishlist = Wishlist.create!(
    user_id: user_id,
    url: "https://www.amazon.co.jp/hz/wishlist/ls/wishlist" + (n+1).to_s
  )

  (rand(10)+1).times do |k|
    wishlist.wishlist_items.create(
      item_id: rand(ITEM_NUM) + 1
    )
  end
end

USER_NUM.times do |n|
  user_id = n + 1
  game_ids = (1..GAME_NUM).to_a.sample(4)
  100.times do
    game = Game.find(game_ids.sample)
    game.purchase_records.create!(
      user_id: user_id,
      amount: rand(100000) + 1,
      comment: Faker::Quote.famous_last_words,
    )
  end
end
