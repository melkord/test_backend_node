import { get } from "http";
import { prisma } from "./prisma";
import { getPasswordHash } from "./helpers";

async function main() {
  const countHomeworks = await prisma.homework.count();
  if (countHomeworks === 0) {
    await prisma.homework.createMany({
      data: [
        {
          title: "Math Assignment",
          description: "Complete exercises 1-10",
          dueDate: new Date("2025-03-01"),
        },
        {
          title: "History Essay",
          description: "Write a 2-page essay on World War II",
          dueDate: new Date("2025-02-20"),
        },
        {
          title: "Science Project",
          description: "Build a model volcano",
          dueDate: new Date("2025-03-10"),
        },
      ],
    });
    console.log("Homework Seed data inserted!");
  } else {
    console.log("Homework already seeded, skipping...");
  }
  const countUsers = await prisma.user.count();
  if (countUsers === 0) {
    await prisma.user.createMany({
      data: [
        {
          email: "el_barto@gmail.com",
          password: getPasswordHash("el_barto_password"),
        },
        {
          email: "skinner@gmail.com",
          password: getPasswordHash("skinner_password"),
        },
      ],
    });
    console.log("User Seed data inserted!");
  } else {
    console.log("User already seeded, skipping...");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
