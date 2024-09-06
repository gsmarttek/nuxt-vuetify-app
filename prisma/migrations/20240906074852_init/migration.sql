/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occupation` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `department` VARCHAR(191) NOT NULL,
    ADD COLUMN `doctor` ENUM('no', 'yes') NOT NULL DEFAULT 'no',
    ADD COLUMN `occupation` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    ADD COLUMN `photo` VARCHAR(191) NULL,
    ADD COLUMN `sex` ENUM('male', 'female') NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `role` ENUM('medical_records', 'super_admin', 'admin', 'doctor', 'pharm', 'lab', 'cashier', 'nurse', 'insurance', 'x_ray', 'anc', 'uss', 'doctor_admin', 'pharm_admin', 'medical_records_admin', 'lab_admin', 'cashier_admin', 'nurse_admin', 'insurance_admin') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);
