-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "originalLink" TEXT NOT NULL,
    "shortenUrl" TEXT NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);
