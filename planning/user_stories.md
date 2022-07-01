As a ____, I can ____, Because _____

* Menu
* Cart
* Twilio

As a not logged in user, I can view the menu but CANNOT create an order, because I am not registered to use the features

As a logged in user, I can views the menu AND create an order, because I am registered to use the features

As a logged in user, I can see the estimated delivery time on my order, because I have not picked it up yet

As a logged in user, I can choose and save favourite dishes (menu) from the restaurant, because its a useful feature

As a logged in user, I can see the total of the order in the nav bar of the app, because it is convenient to keep track of how much it will cost before the order is placed.

As a logged in user, I can leave a rating 1-5 on each dish on the menu, because it is important that people know what is good on the menu

As the logged in admin, I can view orders made to through the app, because I am in charge of that sort of thing

As the logged in admin, I can edit the menu (food_items), because I am in charge of what I am selling

## NOUNS

- users
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(255),
    password TEXT,
    is_admin BOOLEAN,
    favourites REFERENCES user_favourites(id),
    past_orders REFERENCES past_orders(id)
- food_items
    id SERIAL PRIMARY KEY,
    name VARCHAR(255), 
    description TEXT,
    price_cents INTEGER,
    rating SMALLINT
    thumbnail_url TEXT,
- past_orders
    id SERIAL PRIMARY KEY,
    user_id REFERENCES users(id),
    
- user_favourites
