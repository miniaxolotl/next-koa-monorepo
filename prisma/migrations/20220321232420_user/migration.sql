-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(16) NOT NULL,
    `email` VARCHAR(64) NOT NULL,
    `firstname` VARCHAR(64) NOT NULL,
    `lastname` VARCHAR(64) NOT NULL,
    `password` VARCHAR(64) NOT NULL,
    `lastIP` VARCHAR(64) NOT NULL,
    `verified` BOOLEAN NOT NULL DEFAULT false,
    `verificationToken` VARCHAR(32) NOT NULL,
    `deleted` DATETIME(3) NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_userId_key`(`userId`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
