# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Begin seeding..."

50.times do
    User.create!(
        username: Faker::Internet.username,
        password: BCrypt::Password.create(Faker::Internet.password),
        bio: Faker::Lorem.paragraph(sentence_count: 7)
    )
end

20.times do
    Cat.create!(
        name: Faker::Creature::Cat.name,
        birthdate: Faker::Date.between(from: '2004-01-01', to: '2022-10-05'),
        favorite_toy: Faker::Lorem.word,
        breed: Faker::Creature::Cat.breed
    )
end

5.times do
    Adventure.create!(
        user_id: Faker::Number.between(from: 1, to: 50),
        cat_id: Faker::Number.between(from: 1, to: 20),
        title: Faker::Lorem.sentence(word_count: 3),
        description: "#{Faker::Lorem.sentence(word_count: 10)} #{Faker::Lorem.sentence(word_count: 7)} #{Faker::Lorem.sentence(word_count: 13)} #{Faker::Lorem.sentence(word_count: 11)}",
        location: "#{Faker::Address.city}, #{Faker::Address.state}"
    ) 
end

10.times do
    AdventureLike.create!(
        user_id: Faker::Number.between(from: 1, to: 50),
        adventure_id: Faker::Number.between(from: 1, to: 5)
    )
end

puts "Seeding is done!"