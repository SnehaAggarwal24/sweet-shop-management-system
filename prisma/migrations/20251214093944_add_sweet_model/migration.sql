/*
  Warnings:

  - The primary key for the `Sweet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Sweet` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Sweet` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Sweet` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `price` on the `Sweet` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Sweet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL
);
INSERT INTO "new_Sweet" ("category", "id", "name", "price", "quantity") SELECT "category", "id", "name", "price", "quantity" FROM "Sweet";
DROP TABLE "Sweet";
ALTER TABLE "new_Sweet" RENAME TO "Sweet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
