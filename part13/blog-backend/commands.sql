CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes int DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Viksy', 'https://sniperbot.live', 'SniperBot', 5);
INSERT INTO blogs (author, url, title) VALUES ('Viktor', 'https://viktor.com', 'My Blog');