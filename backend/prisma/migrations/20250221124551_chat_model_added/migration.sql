-- DropForeignKey
ALTER TABLE "chats" DROP CONSTRAINT "chats_toUser_fkey";

-- AlterTable
ALTER TABLE "chats" ALTER COLUMN "fromUser" SET DATA TYPE TEXT;
