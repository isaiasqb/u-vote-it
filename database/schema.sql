DROP TABLE IF EXISTS votes;
DROP TABLE IF EXISTS supremes;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS witches;

CREATE TABLE orders (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  creed_declaration TEXT
);

CREATE TABLE supremes (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  royal_lineage BOOLEAN NOT NULL,
  order_id INTEGER,
  CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

CREATE TABLE witches (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  element VARCHAR(50) NOT NULL,
  joined_order DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE votes (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  witch_id INTEGER NOT NULL,
  supreme_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uc_witch UNIQUE (witch_id),  /* values inserted into the voter_id field must be unique, no duplicate votes */
  CONSTRAINT fk_witch FOREIGN KEY (witch_id) REFERENCES witches(id) ON DELETE CASCADE,
  CONSTRAINT fk_supreme FOREIGN KEY (supreme_id) REFERENCES supremes(id) ON DELETE CASCADE
);