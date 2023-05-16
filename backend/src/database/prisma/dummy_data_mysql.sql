INSERT INTO `Item` (`name`) VALUES ('Item1'), ('Item2'), ('Item3');

INSERT INTO `User` (`name`, `password`, `email`, `isAdmin`) VALUES
  ('User1', 'password1', 'user1@example.com', FALSE),
  ('User2', 'password2', 'user2@example.com', TRUE),
  ('User3', 'password3', 'user3@example.com', FALSE);

INSERT INTO `Post` (`userId`, `title`, `comment`) VALUES
  (1, 'Post1', 'This is a comment for Post1'),
  (2, 'Post2', 'This is a comment forPost2'),
  (3, 'Post3', 'This is a comment for Post3');

INSERT INTO Comment (userId, postId, comment) VALUES 
(1, 1, 'User1 comment on Post1'),
(1, 2, 'User1 comment on Post2'),
(2, 1, 'User2 comment on Post1'),
(2, 3, 'User2 comment on Post3'), 
(3, 1, 'User3 comment on Post1'),
(3, 2, 'User3 comment on Post2');

INSERT INTO Tag (name) VALUES ('Tag1'), ('Tag2'), ('Tag3');

INSERT INTO PostTag (postId, tagId, assignedBy) VALUES 
(1, 1, 'User1'),
(1, 2, 'User2'), 
(2, 1, 'User2'),
(2, 3, 'User3'),
(3, 2, 'User3'),
(3, 3, 'User1');