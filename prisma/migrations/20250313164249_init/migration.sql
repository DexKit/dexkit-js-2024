-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "extraNotes" TEXT NOT NULL DEFAULT '',
    "cost" DOUBLE PRECISION NOT NULL,
    "paymentType" TEXT NOT NULL DEFAULT 'single',
    "paymentTxId" TEXT,
    "paymentNetwork" TEXT,
    "paymentCoin" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "ipAddress" TEXT,
    "locale" TEXT NOT NULL DEFAULT 'en',

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "services_clientEmail_idx" ON "services"("clientEmail");

-- CreateIndex
CREATE INDEX "services_createdAt_idx" ON "services"("createdAt" DESC);

-- CreateIndex
CREATE INDEX "services_status_idx" ON "services"("status");
