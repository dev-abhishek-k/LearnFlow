-- AlterTable
ALTER TABLE "SubSection" ADD COLUMN     "content" TEXT,
ADD COLUMN     "imageUrl" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Section_courseId_position_key" ON "Section"("courseId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "SubSection_sectionId_position_key" ON "SubSection"("sectionId", "position");
