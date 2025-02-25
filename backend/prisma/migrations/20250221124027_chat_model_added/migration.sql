-- CreateTable
CREATE TABLE "chats" (
    "id" SERIAL NOT NULL,
    "fromUser" INTEGER NOT NULL,
    "toUser" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_toUser_fkey" FOREIGN KEY ("toUser") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
