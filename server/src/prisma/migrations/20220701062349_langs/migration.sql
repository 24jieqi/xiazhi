-- CreateTable
CREATE TABLE "Langs" (
    "lang_id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "value" "LanguageType" NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Langs_pkey" PRIMARY KEY ("lang_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Langs_label_key" ON "Langs"("label");
