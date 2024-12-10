/*
  Warnings:

  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roleId`,
    ADD COLUMN `role` ENUM('admin', 'super_admin', 'medical_records', 'doctor', 'nurse', 'pharm', 'anc', 'uss', 'insurance') NULL;

-- DropTable
DROP TABLE `role`;
