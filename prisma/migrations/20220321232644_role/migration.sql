-- CreateTable
CREATE TABLE `Role` (
    `role` VARCHAR(16) NOT NULL,
    `authority` SMALLINT NOT NULL,
    `deleted` DATETIME(3) NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Role_authority_key`(`authority`),
    PRIMARY KEY (`role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
