/*
  Warnings:

  - Added the required column `isDisplay` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chat" TEXT NOT NULL,
    "isDisplay" BOOLEAN NOT NULL
);
INSERT INTO "new_Chat" ("chat", "id") SELECT "chat", "id" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
