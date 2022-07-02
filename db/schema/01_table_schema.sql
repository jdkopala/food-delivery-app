DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS food_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS user_favourites CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  password TEXT NOT NULL,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE food_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  prep_time_minutes INTEGER NOT NULL,
  price_cents INTEGER NOT NULL,
  rating SMALLINT,
  menu_category VARCHAR(255) NOT NULL,
  thumbnail_url TEXT
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id REFERENCES users(id) ON DELETE CASCADE,
  order_date DATE NOT NULL
);

CREATE TABLE order_items (
  order_id REFERENCES orders(id) ON DELETE CASCADE,
  food_id REFERENCES food_items(id) ON DELETE CASCADE
);

CREATE TABLE user_favourites (
  customer_id REFERENCES users(id),
  food_id REFERENCES food_items(id) ON DELETE CASCADE
)
