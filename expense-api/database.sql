CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(50) UNIQUE NOT NULL,
  password TEXT,
  avatar_img TEXT, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  currency_type TEXT DEFAULT 'MNT'
)

CREATE TABLE categories (
    id VARCHAR(21) PRIMARY KEY,
    name VARCHAR(55)
)

CREATE TABLE transactions (
    id VARCHAR(21) PRIMARY KEY,
    amount MONEY,
    date TIMESTAMP,
    category_id VARCHAR(21),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories (id)
)

-- Categories
INSERT INTO categories VALUES('1', 'Food & Drinks');
INSERT INTO categories VALUES('2', 'Housing');
INSERT INTO categories VALUES('3', 'Shopping');

-- Transactions
INSERT INTO transactions(id, amount, category_id) VALUES('12', 10000, '1');
INSERT INTO transactions(id, amount, category_id) VALUES('14', 23000, '2');
INSERT INTO transactions(id, amount, category_id) VALUES('18', -5000, '3');

-- 
SELECT transactions.id, amount, category_id, categories.name category_name FROM transactions LEFT JOIN categories on transactions.category_id = categories.id;