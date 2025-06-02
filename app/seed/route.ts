import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { users, topics, questions } from "../../lib/placeholder-data";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.$transaction(async (tx) => {
      // Optional: Drop all data first
      await tx.answer.deleteMany();
      await tx.question.deleteMany();
      await tx.topic.deleteMany();
      await tx.user.deleteMany();

      // Insert users
      for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await tx.user.create({
          data: { id: user.id, name: user.name, email: user.email, password: hashedPassword },
        });
      }

      // Insert topics
      for (const topic of topics) {
        await tx.topic.create({ data: { id: topic.id, title: topic.title } });
      }

      // Insert questions
      for (const question of questions) {
        await tx.question.create({
          data: {
            id: question.id,
            title: question.title,
            topic_id: question.topic,
            votes: question.votes,
          },
        });
      }

      // Insert sample answer
      await tx.answer.create({
        data: {
          id: "0b93d8dc-6e43-49e3-b59f-b67531247612",
          answer: "It's a new feature in TypeScript that makes it easier to write type-safe code.",
          question_id: "0b93d8dc-6e43-49e3-b59f-b67531247612",
        },
      });
    });

    revalidatePath("/", "layout");
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error(error?.stack || error);  // Logs full error stack or message
    return Response.json(
      { error: error?.message || error?.toString() || "Unknown error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
