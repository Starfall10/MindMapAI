-- CreateTable
CREATE TABLE "Log" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "logRequest" TEXT NOT NULL,
    "logResponse" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "cost" TEXT NOT NULL
);
