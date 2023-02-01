CREATE DATABASE IF NOT EXISTS `db_migrations_testing`;
USE `db_migrations_testing`;
--
-- Table structure for table `permissions`
-- 
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    PRIMARY KEY (`id`)
);
--
-- Table structure for table `roles`
--
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    PRIMARY KEY (`id`)
);
--
-- Table structure for table `roles_permissions`
--
DROP TABLE IF EXISTS `roles_permissions`;
CREATE TABLE `roles_permissions` (
    `id` int NOT NULL AUTO_INCREMENT,
    `role` int NOT NULL,
    `permission` int NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_new_table_1_idx` (`role`),
    KEY `fk_new_table_2_idx` (`permission`),
    CONSTRAINT `fk_roles_permissions__permissions` FOREIGN KEY (`permission`) REFERENCES `permissions` (`id`) ON UPDATE CASCADE,
    CONSTRAINT `fk_roles_permissions__roles` FOREIGN KEY (`role`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
);
--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    `role` int NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_users_roles` FOREIGN KEY (`id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE
);