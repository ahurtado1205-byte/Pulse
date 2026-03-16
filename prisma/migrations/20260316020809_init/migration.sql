-- CreateTable
CREATE TABLE "Hotel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "habitaciones" INTEGER NOT NULL,
    "categoria" TEXT NOT NULL,
    "adminEmail" TEXT NOT NULL,
    "adminPassword" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OperacionDiaria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fecha" DATETIME NOT NULL,
    "habitacionesVendidas" INTEGER NOT NULL DEFAULT 0,
    "adrDiario" REAL NOT NULL DEFAULT 0,
    "nuevasReservas" INTEGER NOT NULL DEFAULT 0,
    "cancelaciones" INTEGER NOT NULL DEFAULT 0,
    "origenPredominante" TEXT,
    "eventoAtractor" TEXT,
    "hotelId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OperacionDiaria_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Hotel_adminEmail_key" ON "Hotel"("adminEmail");

-- CreateIndex
CREATE UNIQUE INDEX "OperacionDiaria_fecha_hotelId_key" ON "OperacionDiaria"("fecha", "hotelId");
