/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `sex` ENUM('male', 'female') NOT NULL,
    `occupation` VARCHAR(191) NOT NULL,
    `role` ENUM('medical_records', 'super_admin', 'admin', 'doctor', 'pharm', 'lab', 'cashier', 'nurse', 'insurance', 'x_ray', 'anc', 'uss', 'doctor_admin', 'pharm_admin', 'medical_records_admin', 'lab_admin', 'cashier_admin', 'nurse_admin', 'insurance_admin') NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `department` VARCHAR(191) NOT NULL,
    `doctor` ENUM('no', 'yes') NOT NULL DEFAULT 'no',

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
