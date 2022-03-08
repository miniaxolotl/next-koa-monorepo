-- CreateTable
CREATE TABLE `Role` (
    `role` VARCHAR(16) NOT NULL,
    `authority` TINYINT UNSIGNED NOT NULL,

    UNIQUE INDEX `Role_role_key`(`role`),
    UNIQUE INDEX `Role_authority_key`(`authority`),
    PRIMARY KEY (`role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
