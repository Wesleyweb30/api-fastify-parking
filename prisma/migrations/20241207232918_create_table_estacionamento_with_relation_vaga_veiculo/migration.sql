-- CreateTable
CREATE TABLE `estacionamentos_tb` (
    `id` VARCHAR(191) NOT NULL,
    `entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `saida` DATETIME(3) NOT NULL,
    `valor` DECIMAL(65, 30) NOT NULL,
    `vagaId` VARCHAR(191) NOT NULL,
    `veiculoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `estacionamentos_tb` ADD CONSTRAINT `estacionamentos_tb_veiculoId_fkey` FOREIGN KEY (`veiculoId`) REFERENCES `veiculos_tb`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `estacionamentos_tb` ADD CONSTRAINT `estacionamentos_tb_vagaId_fkey` FOREIGN KEY (`vagaId`) REFERENCES `vagas_tb`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
