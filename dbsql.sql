create database bookdb

CREATE TABLE book (
    id VARCHAR(255) PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    description VARCHAR(50)
);

//post method

INSERT INTO book(id, name, description)
VALUES
  ('1', 'book1', 'good book'),
  ('2', 'book2', 'another good book');


"insert into book(id,mane,description)
value($1,$2,$3) returning* ",[id , name, description]
