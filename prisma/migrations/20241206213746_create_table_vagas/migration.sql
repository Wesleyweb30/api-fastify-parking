-- CreateTable
CREATE TABLE `vagas_tb` (
    `id` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `setor` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'livre',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `vagas_tb_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
