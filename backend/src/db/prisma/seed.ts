import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 5; i++) {
    const totalBalance = Number(faker.finance.amount({ min: 3000, max: 10000 }));

    const expenses = Array.from({ length: 10 }).map(() => ({
      title: faker.commerce.productName(),
      amount: Number(faker.finance.amount({ min: 50, max: 1000 })),
      category: faker.helpers.arrayElement([
        "Groceries",
        "Transport",
        "Utilities",
        "Rent",
        "Health",
        "Entertainment",
        "Education",
      ]),
      type: "expense",
      description: faker.lorem.sentence(),
      date: faker.date.between({ from: "2024-01-01", to: "2024-12-31" }),
    }));

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const availableBalance = Math.max(totalBalance - totalExpenses, 0); 
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        googleId: faker.string.uuid(),
        password: faker.internet.password(),
        picture: faker.image.avatar(),
        totalBalance: totalBalance,
        availableBalance: availableBalance,
      },
    });

    const expensesWithUserId = expenses.map((expense) => ({
      ...expense,
      userId: user.id,
    }));

    await prisma.expense.createMany({ data: expensesWithUserId });
  }

  console.log("✅ Database seeded with users and correct balance logic!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
