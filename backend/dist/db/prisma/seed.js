"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 5; i++) {
            const totalBalance = Number(faker_1.faker.finance.amount({ min: 3000, max: 10000 }));
            const expenses = Array.from({ length: 10 }).map(() => ({
                title: faker_1.faker.commerce.productName(),
                amount: Number(faker_1.faker.finance.amount({ min: 50, max: 1000 })),
                category: faker_1.faker.helpers.arrayElement([
                    "Groceries",
                    "Transport",
                    "Utilities",
                    "Rent",
                    "Health",
                    "Entertainment",
                    "Education",
                ]),
                type: "expense",
                description: faker_1.faker.lorem.sentence(),
                date: faker_1.faker.date.between({ from: "2024-01-01", to: "2024-12-31" }),
            }));
            const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
            const availableBalance = Math.max(totalBalance - totalExpenses, 0);
            const user = yield prisma.user.create({
                data: {
                    name: faker_1.faker.person.fullName(),
                    email: faker_1.faker.internet.email(),
                    googleId: faker_1.faker.string.uuid(),
                    password: faker_1.faker.internet.password(),
                    picture: faker_1.faker.image.avatar(),
                    totalBalance: totalBalance,
                    availableBalance: availableBalance,
                },
            });
            const expensesWithUserId = expenses.map((expense) => (Object.assign(Object.assign({}, expense), { userId: user.id })));
            yield prisma.expense.createMany({ data: expensesWithUserId });
        }
        console.log("✅ Database seeded with users and correct balance logic!");
    });
}
main()
    .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
