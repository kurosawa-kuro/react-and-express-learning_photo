-- Drop tables if they exist
DROP TABLE IF EXISTS `PostTag`;
DROP TABLE IF EXISTS `Tag`;
DROP TABLE IF EXISTS `Comment`;
DROP TABLE IF EXISTS `Post`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Item`;

-- Create tables and insert dummy data
-- Item
CREATE TABLE `Item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `Item` (`name`)
VALUES ('Sample Item 1'),
       ('Sample Item 2'),
       ('Sample Item 3');

-- User
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL UNIQUE,
  `password` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL UNIQUE,
  `isAdmin` boolean NOT NULL DEFAULT false,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `User` (`name`, `password`, `email`, `isAdmin`)
VALUES ('John Doe', 'password123', 'john.doe@example.com', false),
       ('Jane Smith', 'password456', 'jane.smith@example.com', true);

-- Post
CREATE TABLE `Post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `title` varchar(191) NOT NULL DEFAULT 'No Title',
  `image` varchar(191) NOT NULL DEFAULT 'https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png',
  `originalName` varchar(191) NOT NULL DEFAULT 'sample.jpg',
  `comment` varchar(191) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId_id_unique` (`userId`, `id`),
  FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `Post` (`userId`, `title`, `comment`)
VALUES (1, 'Sample Post 1', 'This is a sample post by John Doe'),
       (2, 'Sample Post 2', 'This is a sample post by Jane Smith');

-- Comment
CREATE TABLE `Comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `postId` int(11) NOT NULL,
  `comment` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `userId_postId_id_unique` (`userId`, `postId`, `id`),
  FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tag
CREATE TABLE `Tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(191) NOT NULL UNIQUE,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `Tag` (`name`)
VALUES ('Technology'),
       ('Science'),
       ('Art');

-- PostTag
CREATE TABLE `PostTag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `postId` int(11) NOT NULL,
  `tagId` int(11) NOT NULL,
  `assignedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `assignedBy` varchar(191) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `postId_tagId_unique` (`postId`, `tagId`),
  FOREIGN KEY (`postId`) REFERENCES `Post` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`tagId`) REFERENCES `Tag` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `PostTag` (`postId`, `tagId`, `assignedBy`)
VALUES (1, 1, 'John Doe'),
       (1, 2, 'John Doe'),
       (2, 3, 'Jane Smith');
